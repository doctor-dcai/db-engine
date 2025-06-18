import express from 'express';
import connectDB from '../config/mongo';
import userRoutes from './routes/user.routes';
const app = express();
app.use(express.json());
connectDB();
app.use('/api/users', userRoutes);
export default app;
