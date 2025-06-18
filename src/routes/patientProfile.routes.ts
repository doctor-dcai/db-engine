import express from 'express';
import { patientProfileController } from '../controllers';

const router = express.Router();

router.post('/createPatientProfile', patientProfileController.create);
router.put('/:walletId', patientProfileController.update);

export default router;