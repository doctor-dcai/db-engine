"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionLog = void 0;
const mongoose_1 = require("mongoose");
const SessionLogSchema = new mongoose_1.Schema({
    medicalLogRef: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'MedicalLog',
        required: true,
        index: true
    },
    data: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
exports.SessionLog = (0, mongoose_1.model)('SessionLog', SessionLogSchema);
