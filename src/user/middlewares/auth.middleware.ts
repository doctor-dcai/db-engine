import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user.model';
import { config } from '@config/config';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    // Verify token and type-check the result
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    if (typeof decoded === 'string' || !decoded.id) {
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Attach user to request
    (req as any).user = user;
    (req as any).token = token;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    res.status(401).json({ error: 'Authentication failed' });
  }
};