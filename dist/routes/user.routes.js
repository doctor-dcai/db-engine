import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.send('User routes working!');
});
// Add other routes (POST, PUT, DELETE) here
export default router;
