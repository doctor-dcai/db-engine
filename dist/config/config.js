"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables first
exports.config = {
    jwtSecret: process.env.JWT_SECRET, // Must not be undefined
    jwtExpiration: '7d' // Explicit string literal type
};
