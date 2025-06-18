"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientProfileService = exports.PatientProfileService = void 0;
const patientProfile_model_1 = require("../models/patientProfile.model");
class PatientProfileService {
    async createProfile(profileData) {
        // Ensure required fields are set
        const completeProfile = {
            ...profileData,
            meta: {
                versionId: 1,
                createdAt: new Date(),
                lastUpdated: new Date(),
                source: profileData.meta?.source || 'user_manual_entry',
                ...profileData.meta
            }
        };
        try {
            return await patientProfile_model_1.PatientProfile.create(completeProfile);
        }
        catch (error) {
            console.error('Failed to create profile:', error);
            throw new Error('Failed to create patient profile');
        }
    }
    async updateProfile(walletId, updates) {
        // First get the current version
        const currentProfile = await patientProfile_model_1.PatientProfile.findOne({ walletId });
        if (!currentProfile) {
            return this.createProfile({
                walletId,
                ...updates
            });
        }
        // Prepare the update object carefully
        const updateObj = { ...updates };
        // Handle meta updates separately
        if (updates.meta) {
            updateObj.$set = {
                ...updateObj.$set,
                'meta.versionId': currentProfile.meta.versionId + 1,
                'meta.lastUpdated': new Date(),
                'meta.source': updates.meta.source || currentProfile.meta.source
            };
            delete updateObj.meta; // Remove to avoid conflict
        }
        return patientProfile_model_1.PatientProfile.findOneAndUpdate({ walletId }, updateObj, { new: true, runValidators: true });
    }
}
exports.PatientProfileService = PatientProfileService;
exports.patientProfileService = new PatientProfileService();
