// src/app.ts (modified)
import express from 'express';
import cors from 'cors';
import interaction from './routes/interaction.routes';
import patientProfile from './routes/patientProfile.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/interaction', interaction);
app.use('/api/patientProfile', patientProfile);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

export default app;  // Just export the app, don't start server here