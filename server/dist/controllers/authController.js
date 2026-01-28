"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const validators_1 = require("../utils/validators");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const register = async (req, res) => {
    try {
        const parsed = validators_1.registerSchema.parse(req.body);
        const existsEmail = await User_1.default.findOne({ email: parsed.email });
        if (existsEmail)
            return res.status(400).json({ message: 'Email already in use' });
        const existsUsername = await User_1.default.findOne({ username: parsed.username });
        if (existsUsername)
            return res.status(400).json({ message: 'Username already in use' });
        const user = new User_1.default(parsed);
        await user.save();
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            username: user.username,
            role: user.role,
            avatar: user.avatar,
        }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({
            user: { id: user._id, username: user.username, role: user.role },
            token,
        });
    }
    catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({ message: `${field} already in use` });
        }
        res.status(400).json({ message: err?.message || 'Validation failed' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const parsed = validators_1.loginSchema.parse(req.body);
        const user = await User_1.default.findOne({ email: parsed.email });
        console.log('User found:', user);
        const isMatch = user ? await user.comparePassword(parsed.password) : false;
        console.log('Password match:', isMatch);
        if (!user || !isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role, avatar: user.avatar }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({
            user: { id: user._id, username: user.username, role: user.role },
            token,
        });
    }
    catch (err) {
        res.status(400).json({ message: err?.message || 'Validation failed' });
    }
};
exports.login = login;
const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });
    res.status(200).json({ success: true, message: 'Logged out' });
};
exports.logout = logout;
