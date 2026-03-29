/**
 * Middleware to authenticate users using JWT tokens.
 * It checks for the presence of a token in the request cookies or Authorization header, verifies it, and checks if it's blacklisted.
 * If the token is valid, it attaches the decoded user information to the request object and allows the request to proceed.
 * If the token is missing, invalid, expired, or blacklisted, it throws an appropriate error.
 */

const jwt = require('jsonwebtoken');
const BlackListedToken = require('../models/blackListedToken.model');
const ApiError = require('../utils/apiError');
const auth = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new ApiError(401, 'No token provided');
        }
        const blackListedToken = await BlackListedToken.findOne({ token });
        if (blackListedToken) {
            throw new ApiError(401, 'Unauthorized');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return next(new ApiError(401, 'Invalid token'));
        } else if (err.name === 'TokenExpiredError') {
            return next(new ApiError(401, 'Token expired'));
        }
        next(err);
    }
};

module.exports = auth;