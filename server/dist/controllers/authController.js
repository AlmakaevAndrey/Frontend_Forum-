"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.logout = exports.login = exports.register = void 0;
const validators_1 = require("../utils/validators");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
const createAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user._id,
        username: user.username,
        role: user.role,
        avatar: user.avatar,
    }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
const createRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user._id }, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRES_IN,
    });
};
const refreshAccessToken = async (refreshToken) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, JWT_REFRESH_SECRET);
        const user = await User_1.default.findById(decoded.id);
        if (!user)
            throw new Error();
        return createAccessToken(user);
    }
    catch (error) {
        throw new Error('Invalid refresh token');
    }
};
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
        const token = createAccessToken(user);
        const refreshToken = createRefreshToken(user);
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
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
        const isMatch = user ? await user.comparePassword(parsed.password) : false;
        if (!user || !isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = createAccessToken(user);
        const refreshToken = createRefreshToken(user);
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
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
const logout = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
        const user = await User_1.default.findOne({ refreshToken });
        if (user) {
            user.refreshToken = undefined;
            await user.save();
        }
    }
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
    });
    res.status(200).json({ success: true, message: 'Logged out' });
};
exports.logout = logout;
const refresh = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
        return res.status(401).json({ message: 'No refresh token' });
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, JWT_REFRESH_SECRET);
        const user = await User_1.default.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        const newRefreshToken = createRefreshToken(user);
        user.refreshToken = newRefreshToken;
        await user.save();
        const newAccessToken = createAccessToken(user);
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ token: newAccessToken });
    }
    catch {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};
exports.refresh = refresh;
