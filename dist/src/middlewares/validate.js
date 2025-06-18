"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSession = void 0;
const validateSession = (req, res, next) => {
    const { UserId, Conversation } = req.body;
    if (!UserId) {
        return res.status(400).json({ error: "UserId is required" });
    }
    if (Conversation && !Conversation.conversation_id) {
        return res.status(400).json({ error: "Conversation ID is required" });
    }
    next();
};
exports.validateSession = validateSession;
