// src/app.ts (modified)
import express from 'express';
import cors from 'cors';
import medicalLog from './medicalLog/routes/medicalLog.routes';
import patientProfile from './patient/routes/patientProfile.routes';
import auth from './user/routes/auth.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', auth);
app.use('/medicalLog', medicalLog);
app.use('/patientProfile', patientProfile);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

export default app;  // Just export the app, don't start server here