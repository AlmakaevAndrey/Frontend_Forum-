"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    console.log('Token', token);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        console.log('Decoded user', decoded);
        next();
    }
    catch (err) {
        console.error('JWT verification error:', err.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
const authorize = (...roles) => (req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    if (roles.length > 0 && (!user.role || !roles.includes(user.role))) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
exports.authorize = authorize;
