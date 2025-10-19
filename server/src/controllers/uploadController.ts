import { Request, Response } from 'express';
import User from '../models/User';

export const updateUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Вы не авторизованы' });
    }

    const { username } = req.body;
    let avatarPath;

    if (req.file) {
      avatarPath = `/uploads/${req.file.filename}`;
    }

    const updateData: any = {};
    if (username) updateData.username = username;
    if (avatarPath) updateData.avatar = avatarPath;

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({
      user,
      message: 'Профиль обновлён успешно',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при обновлении профиля' });
  }
};
