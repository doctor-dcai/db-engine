"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactionController = exports.InteractionController = void 0;
const services_1 = require("../services");
class InteractionController {
    async createInteraction(req, res) {
        try {
            const { walletAddress, patientProfile, activityLog, summary } = req.body;
            if (!walletAddress || !patientProfile) {
                return res.status(400).json({
                    error: 'walletAddress and patientProfile are required'
                });
            }
            const interaction = await services_1.interactionService.createInteraction(walletAddress, patientProfile, activityLog, summary);
            res.status(201).json(interaction);
        }
        catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
    async addActivity(req, res) {
        try {
            const { logEntry } = req.body;
            if (!logEntry?.action) {
                return res.status(400).json({
                    error: 'logEntry.action is required'
                });
            }
            const updated = await services_1.interactionService.addActivityLog(req.params.walletAddress, logEntry);
            if (!updated) {
                return res.status(404).json({
                    error: 'Interaction not found'
                });
            }
            res.json(updated);
        }
        catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
    async updateSummary(req, res) {
        try {
            const { summary } = req.body;
            if (!summary) {
                return res.status(400).json({
                    error: 'summary is required'
                });
            }
            const updated = await services_1.interactionService.updateSummary(req.params.walletAddress, summary);
            if (!updated) {
                return res.status(404).json({
                    error: 'Interaction not found'
                });
            }
            res.json(updated);
        }
        catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
}
exports.InteractionController = InteractionController;
exports.interactionController = new InteractionController();
