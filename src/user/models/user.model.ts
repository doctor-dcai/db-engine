import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '@config/config';
import crypto from 'crypto';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  walletAddress: string;
  role: 'admin' | 'user'; 
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
}

function generateWalletAddress(): string {
  const address = crypto.randomBytes(20).toString('hex');
  return `0x${address}`;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    default: generateWalletAddress
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
}, { timestamps: true });

// Hash password before saving
UserSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
UserSchema.methods.generateAuthToken = function(): string {
  if (!config.jwtSecret) throw new Error('JWT_SECRET missing');
  
  return jwt.sign(
    {
      id: this._id.toString(), // Crucial: convert ObjectId to string
      walletAddress: this.walletAddress,
      role: this.role
    },
    config.jwtSecret,
    {
      expiresIn: '7d',
      algorithm: 'HS256' // Must match verification algorithm
    }
  );
};

export const User = model<IUser>('User', UserSchema);