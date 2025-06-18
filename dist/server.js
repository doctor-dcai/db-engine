import express from 'express';
import dotenv from 'dotenv';
import './config/mongo.js'; // Note: .js extension (even though file is .ts)
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.json());
// Routes
app.get('/', (req, res) => {
    res.send('Server is running!');
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Server failed to start:', err);
});
