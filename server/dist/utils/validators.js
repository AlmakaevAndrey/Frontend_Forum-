"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memeCreateSchema = exports.postCreateSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerSchema = zod_1.default.object({
    username: zod_1.default.string().min(3),
    email: zod_1.default.string().email({ message: 'Invalid email' }),
    password: zod_1.default.string().min(6),
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email({ message: 'Invalid email' }),
    password: zod_1.default.string().min(6),
});
exports.postCreateSchema = zod_1.default.object({
    title: zod_1.default.string().min(1),
    excerpt: zod_1.default.string().min(1),
});
exports.memeCreateSchema = zod_1.default.object({
    imgURL: zod_1.default.string().min(1),
});
