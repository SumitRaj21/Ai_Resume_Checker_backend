const asyncHandler = require('../utils/asyncHandler');
const AuthService = require('../services/auth.service');

class AuthController {
    register = asyncHandler(async (req, res) => {
        const user = await AuthService.register(req.body);
        console.log(user);
        res.status(201).json({ success: true, message: "User registered successfully", data: user });
    });

    login = asyncHandler(async (req, res) => {
        const { user, token } = await AuthService.login(req.body);
        res.cookie('token', token);
        res.status(200).json({ success: true, message: "User logged in successfully", data: user });
    });

    logout = asyncHandler(async (req, res) => {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(400).json({ success: false, message: "No token provided" });
        }
        await AuthService.logout(token);
        res.clearCookie('token');
        res.status(200).json({ success: true, message: "User logged out successfully" });
    });
    getUser = asyncHandler(async (req, res) => {
        const user = await AuthService.getUserById(req.user.userId);
        res.status(200).json({ success: true, data: user });
    });

}

module.exports = new AuthController();