"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const interaction_controller_1 = require("../controllers/interaction.controller");
const router = express_1.default.Router();
// router.use(authMiddleware);
router.post('/submit', interaction_controller_1.interactionController.createInteraction);
router.post('/:walletAddress/activity', interaction_controller_1.interactionController.addActivity);
router.patch('/:walletAddress/summary', interaction_controller_1.interactionController.updateSummary);
exports.default = router;
