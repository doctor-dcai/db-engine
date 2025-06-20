"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalLogService = exports.MedicalLogService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const medicalLog_model_1 = require("../models/medicalLog.model");
const patientProfile_model_1 = require("../../patient/models/patientProfile.model");
const sessionLog_model_1 = require("../../sessionLog/models/sessionLog.model");
class MedicalLogService {
    async createMedicalLog(patientProfileData, sessionLogData = [], summary) {
        try {
            // Validate wallet address
            if (!/^0x[a-fA-F0-9]{40}$/.test(patientProfileData.walletId)) {
                throw new Error('Invalid wallet address format');
            }
            // Create patient profile
            const patientProfile = await patientProfile_model_1.PatientProfile.create({
                ...patientProfileData,
                meta: {
                    source: 'medical_log_creation',
                    versionId: 1,
                    createdAt: new Date(),
                    lastUpdated: new Date(),
                    ...patientProfileData.meta
                }
            });
            // Create medical log
            const medicalLog = await medicalLog_model_1.MedicalLog.create({
                walletAddress: patientProfile.walletId,
                patientProfileRef: patientProfile._id,
                summary
            });
            // Create session logs with proper typing
            const sessionLogs = await Promise.all(sessionLogData.map(log => sessionLog_model_1.SessionLog.create({
                medicalLogRef: medicalLog._id,
                data: log,
                timestamp: log.timestamp || new Date()
            })));
            // Link session logs to the medical log
            medicalLog.sessionLogRefs = sessionLogs.map(log => log._id);
            await medicalLog.save();
            return {
                medicalLog,
                patientProfile,
                sessionLogs
            };
        }
        catch (error) {
            console.error('Medical log creation failed:', error);
            throw new Error(`Failed to create medical record: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async getMedicalLogsByWallet(walletAddress) {
        if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
            throw new Error('Invalid wallet address format');
        }
        return medicalLog_model_1.MedicalLog.find({ walletAddress })
            .populate('patientProfileRef')
            .populate('sessionLogRefs') // Optional: populate session logs
            .sort({ createdAt: -1 })
            .exec();
    }
    async getMedicalLogById(logId) {
        if (!mongoose_1.default.Types.ObjectId.isValid(logId)) {
            throw new Error('Invalid medical log ID');
        }
        return medicalLog_model_1.MedicalLog.findById(logId)
            .populate('patientProfileRef')
            .populate('sessionLogRefs') // Optional
            .exec();
    }
}
exports.MedicalLogService = MedicalLogService;
exports.medicalLogService = new MedicalLogService();
