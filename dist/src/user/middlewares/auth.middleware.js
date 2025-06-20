"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const config_1 = require("@config/config");
const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }
        // Verify token and type-check the result
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        if (typeof decoded === 'string' || !decoded.id) {
            return res.status(401).json({ error: 'Invalid token payload' });
        }
        // Find user
        const user = await user_model_1.User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        // Attach user to request
        req.user = user;
        req.token = token;
        next();
    }
    catch (error) {
        console.error('Authentication error:', error);
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired' });
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(401).json({ error: 'Authentication failed' });
    }
};
exports.authMiddleware = authMiddleware;
