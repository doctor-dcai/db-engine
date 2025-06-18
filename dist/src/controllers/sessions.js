"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = exports.updatePatientProfile = exports.createSession = void 0;
const session_1 = __importDefault(require("../models/session"));
const createSession = async (req, res) => {
    try {
        const session = new session_1.default({
            ...req.body,
            PatientProfile: req.body.PatientProfile // Stores exactly what you send
        });
        await session.save();
        res.status(201).json(session);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createSession = createSession;
const updatePatientProfile = async (req, res) => {
    try {
        const updatedSession = await session_1.default.findByIdAndUpdate(req.params.id, {
            $set: {
                PatientProfile: req.body.PatientProfile !== undefined ? req.body.PatientProfile : null
            }
        }, { new: true });
        if (!updatedSession) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json(updatedSession);
    }
    catch (err) {
        res.status(400).json({
            error: err.message,
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};
exports.updatePatientProfile = updatePatientProfile;
const getSession = async (req, res) => {
    try {
        const session = await session_1.default.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json(session);
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};
exports.getSession = getSession;
