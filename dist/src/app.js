"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts (modified)
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const interaction_routes_1 = __importDefault(require("./routes/interaction.routes"));
const patientProfile_routes_1 = __importDefault(require("./routes/patientProfile.routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/interaction', interaction_routes_1.default);
app.use('/api/patientProfile', patientProfile_routes_1.default);
// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Server error' });
});
exports.default = app; // Just export the app, don't start server here
