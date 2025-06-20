"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../user/middlewares/auth.middleware");
const patientProfile_controller_1 = require("../controllers/patientProfile.controller");
const router = express_1.default.Router();
router.use(auth_middleware_1.authMiddleware);
router.post('/createPatientProfile', patientProfile_controller_1.patientProfileController.create);
router.put('/:walletId', patientProfile_controller_1.patientProfileController.update);
exports.default = router;
