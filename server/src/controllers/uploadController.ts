import { Request, Response } from 'express';
import User from '../models/User';
import path from 'path';

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Файл не загружен' });
    }
    if (!req.user) {
      return res.status(401).json({ message: 'Вы не авторизованы' });
    }

    const filePath = `/uploads/${req.file.filename}`;
    // const filePath = `${req.protocol}://${req.get('host')}/uploads/${
    //   req.file.filename
    // }`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: filePath },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({
      avatar: filePath,
      message: 'Аватар успешно загружен',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при загрузке аватара' });
  }
};
