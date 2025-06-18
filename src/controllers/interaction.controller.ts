import { Request, Response } from 'express';
import { interactionService } from '../services';
import { IPatientProfile } from '../models/patientProfile.model';

export class InteractionController {

  async createInteraction(req: Request, res: Response) {
    try {
      const { walletAddress, patientProfile, activityLog, summary } = req.body;

      if (!walletAddress || !patientProfile) {
        return res.status(400).json({ 
          error: 'walletAddress and patientProfile are required' 
        });
      }

      const interaction = await interactionService.createInteraction(
        walletAddress,
        patientProfile,
        activityLog,
        summary
      );

      res.status(201).json(interaction);
    } catch (error) {
      res.status(400).json({ 
        error: (error as Error).message 
      });
    }
  }

  async addActivity(req: Request, res: Response) {
    try {
      const { logEntry } = req.body;
      
      if (!logEntry?.action) {
        return res.status(400).json({ 
          error: 'logEntry.action is required' 
        });
      }

      const updated = await interactionService.addActivityLog(
        req.params.walletAddress,
        logEntry
      );

      if (!updated) {
        return res.status(404).json({ 
          error: 'Interaction not found' 
        });
      }

      res.json(updated);
    } catch (error) {
      res.status(400).json({ 
        error: (error as Error).message 
      });
    }
  }

  async updateSummary(req: Request, res: Response) {
    try {
      const { summary } = req.body;
      
      if (!summary) {
        return res.status(400).json({ 
          error: 'summary is required' 
        });
      }

      const updated = await interactionService.updateSummary(
        req.params.walletAddress,
        summary
      );

      if (!updated) {
        return res.status(404).json({ 
          error: 'Interaction not found' 
        });
      }

      res.json(updated);
    } catch (error) {
      res.status(400).json({ 
        error: (error as Error).message 
      });
    }
  }
}

export const interactionController = new InteractionController();