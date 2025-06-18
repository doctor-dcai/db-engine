"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sessions_1 = require("../controllers/sessions");
const validate_1 = require("src/middlewares/validate");
const router = express_1.default.Router();
router.post('/createSession', validate_1.validateSession, sessions_1.createSession);
exports.default = router;
