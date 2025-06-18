"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
class ConversationService {
    // CREATE
    async createUser(userData) {
        return await user_model_1.default.create(userData);
    }
    // READ
    async getUsers() {
        return await user_model_1.default.find();
    }
    async getUserById(id) {
        return await user_model_1.default.findById(id);
    }
    // UPDATE
    async updateUser(id, updateData) {
        return await user_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
    }
    // DELETE
    async deleteUser(id) {
        return await user_model_1.default.findByIdAndDelete(id);
    }
}
exports.default = new ConversationService();
