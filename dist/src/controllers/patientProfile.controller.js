"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientProfileController = exports.PatientProfileController = void 0;
const services_1 = require("../services");
class PatientProfileController {
    async create(req, res) {
        try {
            const profile = await services_1.patientProfileService.createProfile(req.body);
            res.status(201).json(profile);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const updated = await services_1.patientProfileService.updateProfile(req.params.walletId, req.body);
            if (!updated)
                return res.status(404).json({ error: 'Profile not found' });
            res.json(updated);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.PatientProfileController = PatientProfileController;
exports.patientProfileController = new PatientProfileController();
