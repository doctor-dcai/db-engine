"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@config/config");
const crypto_1 = __importDefault(require("crypto"));
function generateWalletAddress() {
    const address = crypto_1.default.randomBytes(20).toString('hex');
    return `0x${address}`;
}
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    walletAddress: {
        type: String,
        required: true,
        unique: true,
        default: generateWalletAddress
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, { timestamps: true });
// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
    next();
});
// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcryptjs_1.default.compare(candidatePassword, this.password);
};
// Method to generate JWT token
UserSchema.methods.generateAuthToken = function () {
    if (!config_1.config.jwtSecret)
        throw new Error('JWT_SECRET missing');
    return jsonwebtoken_1.default.sign({
        id: this._id.toString(), // Crucial: convert ObjectId to string
        walletAddress: this.walletAddress,
        role: this.role
    }, config_1.config.jwtSecret, {
        expiresIn: '7d',
        algorithm: 'HS256' // Must match verification algorithm
    });
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
