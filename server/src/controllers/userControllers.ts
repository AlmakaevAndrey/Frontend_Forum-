import { Request, Response } from 'express';
import User from '../models/User';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  console.log('Req.user:', req.user);

  try {
    const user = req.user;
    if (!user || user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied' });
      return;
    }
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error when find users', error);
    res.status(500).json({ message: 'Sever error' });
  }
};
