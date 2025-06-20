// src/server.ts (modified)
import dotenv from 'dotenv';
import app from './app';
import connectDB from '../config/mongo';

// Load environment variables
dotenv.config();

const MONGODB_PORT = process.env.MONGODB_PORT || 8000;

// Database connection and server start
const startServer = async () => {
  try {
    await connectDB();
    
    const server = app.listen(MONGODB_PORT, () => {
      console.log(`Server running on http://localhost:${MONGODB_PORT}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
  } catch (err) {
    console.error('Server failed to start:', err);
    process.exit(1);
  }
};

startServer();