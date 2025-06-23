import { Request, Response } from 'express';
import { medicalLogService } from '../services/medicalLog.service';
import { MedicalLog } from '../models/medicalLog.model';

export class MedicalLogController {
  async createMedicalLog(req: Request, res: Response) {
    try {
      const { patientProfile, log, summary } = req.body;

      // Validate required fields
      if (!patientProfile?.walletId) {
        return res.status(400).json({ error: 'Patient profile data with walletId is required' });
      }

      const result = await medicalLogService.createMedicalLog(
        patientProfile,
        log || [],
        summary
      );

      return res.status(201).json({
        message: 'Medical log created successfully',
        data: result
      });

    } catch (error) {
      console.error('Error creating medical log:', error);
      return res.status(500).json({ 
        error: 'Failed to create medical log',
        details: error.message 
      });
    }
  }

  async getMedicalLog(req: Request, res: Response) {
    try {
      const { medicalLogId } = req.params;

      const medicalLog = await MedicalLog.findById(medicalLogId)
        .populate('patientProfileRef')
        .exec();

      if (!medicalLog) {
        return res.status(404).json({ error: 'Medical log not found' });
      }

      return res.json({
        message: 'Medical log retrieved successfully',
        data: medicalLog
      });

    } catch (error) {
      console.error('Error fetching medical log:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch medical log',
        details: error.message 
      });
    }
  }

  async getMedicalLogsByPatient(req: Request, res: Response) {
    try {
      const { walletAddress } = req.params;

      if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
        return res.status(400).json({ error: 'Invalid wallet address format' });
      }

      const medicalLogs = await MedicalLog.find({ walletAddress })
        .populate('patientProfileRef')
        .sort({ createdAt: -1 })
        .exec();

      return res.json({
        message: 'Medical logs retrieved successfully',
        data: medicalLogs
      });

    } catch (error) {
      console.error('Error fetching medical logs:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch medical logs',
        details: error.message 
      });
    }
  }

  async addLog(req: Request, res: Response) {
    try {
      const { medicalLogId } = req.params;
      const { log } = req.body;

      if (!log?.activityType) {
        return res.status(400).json({ error: 'Activity type is required' });
      }

      const updatedLog = await MedicalLog.findByIdAndUpdate(
        medicalLogId,
        {
          $push: {
            logs: {
              ...log,
              timestamp: log.timestamp || new Date()
            }
          }
        },
        { new: true }
      );

      if (!updatedLog) {
        return res.status(404).json({ error: 'Medical log not found' });
      }

      return res.json({
        message: 'Session log added successfully',
        data: updatedLog
      });

    } catch (error) {
      console.error('Error adding session log:', error);
      return res.status(500).json({ 
        error: 'Failed to add session log',
        details: error.message 
      });
    }
  }
}

export const medicalLogController = new MedicalLogController();