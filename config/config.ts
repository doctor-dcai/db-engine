import dotenv from 'dotenv';
dotenv.config(); // Load environment variables first

export const config = {
  jwtSecret: process.env.JWT_SECRET, // Must not be undefined
  jwtExpiration: '7d' as const // Explicit string literal type
};