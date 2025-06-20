import { Request, Response } from 'express';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';

export class AuthController {
  /**
   * Register new user
   */
  async register(req: Request, res: Response) {
    try {
      const { username, email, password, role } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      // Create user
      const user = new User({
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
    } catch (error) {
      res.status(400).json({ 
        error: (error as Error).message 
      });
    }
  }

  /**
   * Login user
   */
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
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
    } catch (error) {
      res.status(500).json({ 
        error: 'Server error during login' 
      });
    }
  }

  /**
   * Get current user profile
   */
  async getMe(req: Request, res: Response) {
    try {
      // req.user is set by the auth middleware
      const user = await User.findById((req as any).user.id).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ 
        error: 'Server error' 
      });
    }
  }
}

export const authController = new AuthController();