"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    UserId: {
        type: String,
        required: true,
        index: true
    },
    WalletAddress: String,
    PatientProfile: {
        type: mongoose_1.Schema.Types.Mixed,
        default: null
    },
    Conversation: {
        conversation_id: { type: String, required: true },
        start_time: { type: Date, default: Date.now },
        end_time: Date,
        status: {
            type: String,
            enum: ['active', 'closed', 'archived'],
            default: 'active'
        },
        participants: {
            user: {
                user_id: { type: String, required: true },
                name: { type: String, required: true },
                ip: String,
                device: String
            },
            bot: {
                bot_id: { type: String, required: true },
                version: { type: String, required: true }
            }
        },
        channel: { type: String, default: 'web_chat' },
        messages: [{
                message_id: { type: String, required: true },
                sender: {
                    type: String,
                    enum: ['user', 'bot'],
                    required: true
                },
                text: { type: String, required: true },
                timestamp: { type: Date, default: Date.now },
                type: { type: String, default: 'text' },
                status: {
                    type: String,
                    enum: ['delivered', 'read', 'failed'],
                    default: 'delivered'
                }
            }]
    },
    SectionId: Number,
    Summary: String
}, {
    timestamps: true,
    minimize: false
});
exports.default = (0, mongoose_1.model)('Session', sessionSchema);
