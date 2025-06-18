"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const conversation_schema_1 = require("./conversation.schema");
exports.UserSchema = new mongoose_1.Schema({
    UserId: { type: String, required: true, unique: true },
    WalletAddress: { type: String, required: true, unique: true },
    PatientProfile: { type: mongoose_1.Schema.Types.Mixed },
    Conversations: { type: [conversation_schema_1.ConversationSchema], default: [] },
    SectionId: { type: Number },
    Summary: { type: String }
}, { timestamps: true });
