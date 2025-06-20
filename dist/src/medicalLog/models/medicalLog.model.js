"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalLog = void 0;
const mongoose_1 = require("mongoose");
const MedicalLogSchema = new mongoose_1.Schema({
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
    sessionLogRefs: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'SessionLog',
        default: []
    },
    summary: {
        type: String,
        trim: true
    }
}, { timestamps: true });
exports.MedicalLog = (0, mongoose_1.model)('MedicalLog', MedicalLogSchema);
