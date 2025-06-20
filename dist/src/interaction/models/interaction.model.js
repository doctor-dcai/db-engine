"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interaction = void 0;
const mongoose_1 = require("mongoose");
const InteractionSchema = new mongoose_1.Schema({
    walletAddress: {
        type: String,
        required: true,
        match: /^0x[a-fA-F0-9]{40}$/,
        index: true
    },
    patientProfileRef: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'PatientProfile',
        required: true
    },
    activityLog: {
        type: mongoose_1.Schema.Types.Mixed,
        default: [],
        required: true
    },
    summary: String
}, { timestamps: true });
exports.Interaction = (0, mongoose_1.model)('Interaction', InteractionSchema);
