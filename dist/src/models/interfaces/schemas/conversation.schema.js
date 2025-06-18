"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationSchema = void 0;
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    message_id: { type: String, required: true },
    sender: { type: String, enum: ['user', 'bot'], required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true },
    type: { type: String, default: 'text' },
    status: { type: String, enum: ['delivered', 'read', 'sent'], required: true }
});
const ParticipantSchema = new mongoose_1.Schema({
    user: {
        user_id: { type: String, required: true },
        name: { type: String },
        ip: { type: String },
        device: { type: String }
    },
    bot: {
        bot_id: { type: String, required: true },
        version: { type: String }
    }
});
exports.ConversationSchema = new mongoose_1.Schema({
    conversation_id: { type: String, required: true, unique: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date },
    status: { type: String, enum: ['active', 'closed', 'archived'], required: true },
    participants: { type: ParticipantSchema, required: true },
    channel: { type: String, required: true },
    messages: { type: [MessageSchema], default: [] }
}, { timestamps: true });
