"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medicalLog_controller_1 = require("../controllers/medicalLog.controller");
const auth_middleware_1 = require("../../user/middlewares/auth.middleware");
const router = express_1.default.Router();
// Apply auth middleware to all routes
router.use(auth_middleware_1.authMiddleware);
// Medical Log routes
router.post('/submit', medicalLog_controller_1.medicalLogController.createMedicalLog);
router.get('/:medicalLogId', medicalLog_controller_1.medicalLogController.getMedicalLog);
router.get('/patient/:walletAddress', medicalLog_controller_1.medicalLogController.getMedicalLogsByPatient);
router.post('/:medicalLogId/session-logs', medicalLog_controller_1.medicalLogController.addSessionLog);
exports.default = router;
