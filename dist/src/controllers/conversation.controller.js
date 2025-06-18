"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_service_1 = __importDefault(require("../services/conversation.service"));
class UserController {
    async createUser(req, res) {
        try {
            const user = await conversation_service_1.default.createUser(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getUsers(req, res) {
        try {
            const users = await conversation_service_1.default.getUsers();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.default = new UserController();
