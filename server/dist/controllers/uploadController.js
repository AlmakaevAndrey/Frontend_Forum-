"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const updateUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Вы не авторизованы' });
        }
        const { username } = req.body;
        let avatarPath;
        if (req.file) {
            avatarPath = `/uploads/${req.file.filename}`;
        }
        const updateData = {};
        if (username)
            updateData.username = username;
        if (avatarPath)
            updateData.avatar = avatarPath;
        const user = await User_1.default.findByIdAndUpdate(req.user.id, updateData, {
            new: true,
        });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.json({
            user,
            message: 'Профиль обновлён успешно',
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера при обновлении профиля' });
    }
};
exports.updateUser = updateUser;
