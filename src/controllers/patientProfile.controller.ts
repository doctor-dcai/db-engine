import { Request, Response } from 'express';
import { patientProfileService } from '../services';
import { IPatientProfile } from '../models/patientProfile.model';

export class PatientProfileController {
  async create(req: Request, res: Response) {
    try {
      const profile = await patientProfileService.createProfile(req.body);
      res.status(201).json(profile);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await patientProfileService.updateProfile(
        req.params.walletId,
        req.body
      );
      if (!updated) return res.status(404).json({ error: 'Profile not found' });
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export const patientProfileController = new PatientProfileController();