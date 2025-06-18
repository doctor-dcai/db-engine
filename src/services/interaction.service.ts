import { Interaction } from '../models/interaction.model';
import { IInteraction } from '../models';
import { patientProfileService } from './patientProfile.service';
import { IPatientProfile } from '../models/patientProfile.model';

export class InteractionService {
  async createInteraction(
    walletAddress: string,
    patientProfileData: IPatientProfile,
    activityLog: any[] = [],
    summary?: string
  ): Promise<IInteraction> {
    // Validate inputs
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      throw new Error('Invalid wallet address format');
    }

    if (walletAddress !== patientProfileData.walletId) {
      throw new Error('Wallet address mismatch between interaction and profile');
    }

    // Create or update patient profile
    const patientProfile = await patientProfileService.updateProfile(
      patientProfileData.walletId,
      patientProfileData
    );

    if (!patientProfile) {
      throw new Error('Failed to create/update patient profile');
    }

    // Create interaction
    return Interaction.create({
      walletAddress,
      patientProfileRef: patientProfile._id,
      activityLog: activityLog.map(log => ({
        ...log,
        timestamp: log.timestamp || new Date()
      })),
      summary
    });
  }

  async addActivityLog(
    walletAddress: string,
    logEntry: any
  ): Promise<IInteraction | null> {
    return Interaction.findOneAndUpdate(
      { walletAddress },
      { 
        $push: { 
          activityLog: {
            ...logEntry,
            timestamp: new Date() // Auto-add timestamp
          } 
        } 
      },
      { new: true }
    );
  }

  async updateSummary(
    walletAddress: string,
    newSummary: string
  ): Promise<IInteraction | null> {
    return Interaction.findOneAndUpdate(
      { walletAddress },
      { summary: newSummary },
      { new: true }
    );
  }
}

export const interactionService = new InteractionService();