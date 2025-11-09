"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const url = process.env.MONGO_URL;
if (!url) {
    throw new Error('❌ Нет MONGO_URL в .env');
}
const connectDB = async (p0) => {
    try {
        await mongoose_1.default.connect(url);
        console.log('MongoDB connected!');
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
(0, exports.connectDB)();
