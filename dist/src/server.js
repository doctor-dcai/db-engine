"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts (modified)
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const mongo_1 = __importDefault(require("../config/mongo"));
// Load environment variables
dotenv_1.default.config();
const MONGODB_PORT = process.env.MONGODB_PORT || 8000;
// Database connection and server start
const startServer = async () => {
    try {
        await (0, mongo_1.default)();
        const server = app_1.default.listen(MONGODB_PORT, () => {
            console.log(`Server running on http://localhost:${MONGODB_PORT}`);
        });
        // Graceful shutdown
        process.on('SIGTERM', () => {
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });
    }
    catch (err) {
        console.error('Server failed to start:', err);
        process.exit(1);
    }
};
startServer();
