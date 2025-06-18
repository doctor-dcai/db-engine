"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const models_1 = require("../models");
class UserService {
    static async createUser(userData) {
        const user = new models_1.User(userData);
        return await user.save();
    }
    static async getUserById(userId) {
        return await models_1.User.findOne({ UserId: userId });
    }
    static async getUserByWallet(walletAddress) {
        return await models_1.User.findOne({ WalletAddress: walletAddress });
    }
    static async addConversation(userId, conversationData) {
        return await models_1.User.findOneAndUpdate({ UserId: userId }, { $push: { Conversations: conversationData } }, { new: true });
    }
    static async updatePatientProfile(userId, profileData) {
        return await models_1.User.findOneAndUpdate({ UserId: userId }, { $set: { PatientProfile: profileData } }, { new: true });
    }
    static async updateSummary(userId, summary) {
        return await models_1.User.findOneAndUpdate({ UserId: userId }, { $set: { Summary: summary } }, { new: true });
    }
}
exports.UserService = UserService;
exports.default = UserService;
