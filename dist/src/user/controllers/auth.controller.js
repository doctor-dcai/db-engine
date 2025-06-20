"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const user_model_1 = require("../models/user.model");
class AuthController {
    /**
     * Register new user
     */
    async register(req, res) {
        try {
            const { username, email, password, role } = req.body;
            // Check if user exists
            const existingUser = await user_model_1.User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return res.status(400).json({ error: 'Username or email already exists' });
            }
            // Create user
            const user = new user_model_1.User({
                username,
                email,
                password,
                role: role || 'user'
            });
            await user.save();
            // Generate token
            const token = user.generateAuthToken();
            // Return user data (excluding password) and token
            const userData = user.toObject();
            delete userData.password;
            res.status(201).json({
                user: userData,
                token
            });
        }
        catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
    /**
     * Login user
     */
    async login(req, res) {
        try {
            const { email, password } = req.body;
            // Find user by email
            const user = await user_model_1.User.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            // Check password
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            // Generate token
            const token = user.generateAuthToken();
            // Return user data (excluding password) and token
            const userData = user.toObject();
            delete userData.password;
            res.json({
                user: userData,
                token
            });
        }
        catch (error) {
            res.status(500).json({
                error: 'Server error during login'
            });
        }
    }
    /**
     * Get current user profile
     */
    async getMe(req, res) {
        try {
            // req.user is set by the auth middleware
            const user = await user_model_1.User.findById(req.user.id).select('-password');
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json({
                error: 'Server error'
            });
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
