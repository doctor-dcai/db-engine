"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// Public routes
router.post('/register', auth_controller_1.authController.register);
router.post('/login', auth_controller_1.authController.login);
// Protected route
router.get('/me', auth_middleware_1.authMiddleware, auth_controller_1.authController.getMe);
exports.default = router;
