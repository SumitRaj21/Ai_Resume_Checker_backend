const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BlackListedToken = require('../models/blackListedToken.model');

class AuthService {
    register = async (userData) => {
        const { username, email, password } = userData;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(400, 'User already exists with this email');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        const user = newUser.toObject();
        delete user.password;
        return user;
    };

    login = async (loginData) => {
        const { email, password } = loginData;
        let user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new ApiError(400, 'Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ApiError(400, 'Invalid email or password');
        }
        user = user.toObject();
        delete user.password;
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    };

    logout = async (token) => {
        // Add the token to the blacklist
        const blackListedToken = new BlackListedToken({ token });
        await blackListedToken.save();
        return true;
    };
    getUserById = async (userId) => {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        return user;
    };
}

module.exports = new AuthService();