"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const interaction_routes_1 = __importDefault(require("./interaction.routes"));
const patientProfile_routes_1 = __importDefault(require("./patientProfile.routes"));
const router = express_1.default.Router();
router.use('/interactions', interaction_routes_1.default);
router.use('/patient-profiles', patientProfile_routes_1.default);
exports.default = router;
