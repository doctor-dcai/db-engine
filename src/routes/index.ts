import express from 'express';
import interactionRoutes from './interaction.routes';
import patientProfileRoutes from './patientProfile.routes';

const router = express.Router();

router.use('/interactions', interactionRoutes);
router.use('/patient-profiles', patientProfileRoutes);

export default router;