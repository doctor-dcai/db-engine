import express from 'express';
import { interactionController } from '../controllers';

const router = express.Router();

router.post('/submit', interactionController.createInteraction);
router.post('/:walletAddress/activity', interactionController.addActivity);
router.patch('/:walletAddress/summary', interactionController.updateSummary);

export default router;