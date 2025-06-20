import { IPatientProfile, PatientProfile } from '../models/patientProfile.model';

export class PatientProfileService {
  async createProfile(profileData: IPatientProfile): Promise<IPatientProfile> {
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
      return await PatientProfile.create(completeProfile);
    } catch (error) {
      console.error('Failed to create profile:', error);
      throw new Error('Failed to create patient profile');
    }
  }

    async updateProfile(
    walletId: string,
    updates: Partial<IPatientProfile>
    ): Promise<IPatientProfile | null> {
    // First get the current version
    const currentProfile = await PatientProfile.findOne({ walletId });
    if (!currentProfile) {
        return this.createProfile({
        walletId,
        ...updates
        } as IPatientProfile);
    }

    // Prepare the update object carefully
    const updateObj: any = { ...updates };
    
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

    return PatientProfile.findOneAndUpdate(
        { walletId },
        updateObj,
        { new: true, runValidators: true }
    );
    }
}

export const patientProfileService = new PatientProfileService();