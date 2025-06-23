import express from 'express';
import { medicalLogController } from '../controllers/medicalLog.controller';
import { authMiddleware } from '../../user/middlewares/auth.middleware';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Medical Log routes
router.post('/submit', medicalLogController.createMedicalLog);
router.get('/:medicalLogId', medicalLogController.getMedicalLog);
router.get('/patient/:walletAddress', medicalLogController.getMedicalLogsByPatient);
router.post('/:medicalLogId/session-logs', medicalLogController.addLog);

export default router;