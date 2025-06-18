"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_1 = __importDefault(require("../models/session"));
class SessionService {
    async createSession(sessionData) {
        const session = new session_1.default(sessionData);
        return await session.save();
    }
}
exports.default = new SessionService();
