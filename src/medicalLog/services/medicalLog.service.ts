import mongoose, { Types } from 'mongoose';
import { IMedicalLog, MedicalLog } from '../models/medicalLog.model';
import { IPatientProfile, PatientProfile } from '../../patient/models/patientProfile.model';
import { ILog, Log } from 'src/log/models/log.model';

export class MedicalLogService {
  async createMedicalLog(
    patientProfileData: IPatientProfile,
    logData: any[] = [],
    summary?: string
  ): Promise<{
    medicalLog: IMedicalLog;
    patientProfile: IPatientProfile;
    logs: ILog[];
  }> {
    try {
      // Validate wallet address
      if (!/^0x[a-fA-F0-9]{40}$/.test(patientProfileData.walletId)) {
        throw new Error('Invalid wallet address format');
      }

      // Create patient profile
      const patientProfile = await PatientProfile.create({
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
      const medicalLog = await MedicalLog.create({
        walletAddress: patientProfile.walletId,
        patientProfileRef: patientProfile._id,
        summary
      });

      // Create session logs with proper typing
      const logs = await Promise.all(
        logData.map(log => 
            Log.create({
            medicalLogRef: medicalLog._id,
            data: log,
            timestamp: log.timestamp || new Date()
          })
        )
      );

      // Link session logs to the medical log
      medicalLog.logRefs = logs.map(log => log._id) as Types.ObjectId[];
      await medicalLog.save();

      return {
        medicalLog,
        patientProfile,
        logs
      };

    } catch (error) {
      console.error('Medical log creation failed:', error);
      throw new Error(`Failed to create medical record: ${
        error instanceof Error ? error.message : String(error)
      }`);
    }
  }

  async getMedicalLogsByWallet(walletAddress: string): Promise<IMedicalLog[]> {
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      throw new Error('Invalid wallet address format');
    }

    return MedicalLog.find({ walletAddress })
      .populate('patientProfileRef')
      .populate('logRefs') // Optional: populate session logs
      .sort({ createdAt: -1 })
      .exec();
  }

  async getMedicalLogById(logId: string): Promise<IMedicalLog | null> {
    if (!mongoose.Types.ObjectId.isValid(logId)) {
      throw new Error('Invalid medical log ID');
    }

    return MedicalLog.findById(logId)
      .populate('patientProfileRef')
      .populate('logRefs') // Optional
      .exec();
  }
}

export const medicalLogService = new MedicalLogService();
