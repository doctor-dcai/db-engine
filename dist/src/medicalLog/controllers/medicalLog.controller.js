"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalLogController = exports.MedicalLogController = void 0;
const medicalLog_service_1 = require("../services/medicalLog.service");
const medicalLog_model_1 = require("../models/medicalLog.model");
class MedicalLogController {
    async createMedicalLog(req, res) {
        try {
            const { patientProfile, sessionLog, summary } = req.body;
            // Validate required fields
            if (!patientProfile?.walletId) {
                return res.status(400).json({ error: 'Patient profile data with walletId is required' });
            }
            const result = await medicalLog_service_1.medicalLogService.createMedicalLog(patientProfile, sessionLog || [], summary);
            return res.status(201).json({
                message: 'Medical log created successfully',
                data: result
            });
        }
        catch (error) {
            console.error('Error creating medical log:', error);
            return res.status(500).json({
                error: 'Failed to create medical log',
                details: error.message
            });
        }
    }
    async getMedicalLog(req, res) {
        try {
            const { medicalLogId } = req.params;
            const medicalLog = await medicalLog_model_1.MedicalLog.findById(medicalLogId)
                .populate('patientProfileRef')
                .exec();
            if (!medicalLog) {
                return res.status(404).json({ error: 'Medical log not found' });
            }
            return res.json({
                message: 'Medical log retrieved successfully',
                data: medicalLog
            });
        }
        catch (error) {
            console.error('Error fetching medical log:', error);
            return res.status(500).json({
                error: 'Failed to fetch medical log',
                details: error.message
            });
        }
    }
    async getMedicalLogsByPatient(req, res) {
        try {
            const { walletAddress } = req.params;
            if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
                return res.status(400).json({ error: 'Invalid wallet address format' });
            }
            const medicalLogs = await medicalLog_model_1.MedicalLog.find({ walletAddress })
                .populate('patientProfileRef')
                .sort({ createdAt: -1 })
                .exec();
            return res.json({
                message: 'Medical logs retrieved successfully',
                data: medicalLogs
            });
        }
        catch (error) {
            console.error('Error fetching medical logs:', error);
            return res.status(500).json({
                error: 'Failed to fetch medical logs',
                details: error.message
            });
        }
    }
    async addSessionLog(req, res) {
        try {
            const { medicalLogId } = req.params;
            const { sessionLog } = req.body;
            if (!sessionLog?.activityType) {
                return res.status(400).json({ error: 'Activity type is required' });
            }
            const updatedLog = await medicalLog_model_1.MedicalLog.findByIdAndUpdate(medicalLogId, {
                $push: {
                    sessionLogs: {
                        ...sessionLog,
                        timestamp: sessionLog.timestamp || new Date()
                    }
                }
            }, { new: true });
            if (!updatedLog) {
                return res.status(404).json({ error: 'Medical log not found' });
            }
            return res.json({
                message: 'Session log added successfully',
                data: updatedLog
            });
        }
        catch (error) {
            console.error('Error adding session log:', error);
            return res.status(500).json({
                error: 'Failed to add session log',
                details: error.message
            });
        }
    }
}
exports.MedicalLogController = MedicalLogController;
exports.medicalLogController = new MedicalLogController();
