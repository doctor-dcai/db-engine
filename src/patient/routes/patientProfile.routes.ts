import express from 'express';
import { authMiddleware } from 'src/user/middlewares/auth.middleware';
import { patientProfileController } from '../controllers/patientProfile.controller';

const router = express.Router();

router.use(authMiddleware);

router.post('/createPatientProfile', patientProfileController.create);
router.put('/:walletId', patientProfileController.update);

export default router;