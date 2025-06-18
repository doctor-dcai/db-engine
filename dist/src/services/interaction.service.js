"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactionService = exports.InteractionService = void 0;
const interaction_model_1 = require("../models/interaction.model");
const patientProfile_service_1 = require("./patientProfile.service");
class InteractionService {
    async createInteraction(walletAddress, patientProfileData, activityLog = [], summary) {
        // Validate inputs
        if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
            throw new Error('Invalid wallet address format');
        }
        if (walletAddress !== patientProfileData.walletId) {
            throw new Error('Wallet address mismatch between interaction and profile');
        }
        // Create or update patient profile
        const patientProfile = await patientProfile_service_1.patientProfileService.updateProfile(patientProfileData.walletId, patientProfileData);
        if (!patientProfile) {
            throw new Error('Failed to create/update patient profile');
        }
        // Create interaction
        return interaction_model_1.Interaction.create({
            walletAddress,
            patientProfileRef: patientProfile._id,
            activityLog: activityLog.map(log => ({
                ...log,
                timestamp: log.timestamp || new Date()
            })),
            summary
        });
    }
    async addActivityLog(walletAddress, logEntry) {
        return interaction_model_1.Interaction.findOneAndUpdate({ walletAddress }, {
            $push: {
                activityLog: {
                    ...logEntry,
                    timestamp: new Date() // Auto-add timestamp
                }
            }
        }, { new: true });
    }
    async updateSummary(walletAddress, newSummary) {
        return interaction_model_1.Interaction.findOneAndUpdate({ walletAddress }, { summary: newSummary }, { new: true });
    }
}
exports.InteractionService = InteractionService;
exports.interactionService = new InteractionService();
