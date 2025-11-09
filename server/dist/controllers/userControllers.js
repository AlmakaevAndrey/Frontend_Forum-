"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsers = async (req, res) => {
    console.log('Req.user:', req.user);
    try {
        const user = req.user;
        if (!user || user.role !== 'admin') {
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        const users = await User_1.default.find({}, '-password');
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error when find users', error);
        res.status(500).json({ message: 'Sever error' });
    }
};
exports.getUsers = getUsers;
