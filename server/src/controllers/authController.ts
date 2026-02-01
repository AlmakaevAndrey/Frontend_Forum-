import { Request, Response } from 'express';
import { loginSchema, registerSchema } from '../utils/validators';
import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.parse(req.body);

    const existsEmail = await User.findOne({ email: parsed.email });
    if (existsEmail)
      return res.status(400).json({ message: 'Email already in use' });

    const existsUsername = await User.findOne({ username: parsed.username });
    if (existsUsername)
      return res.status(400).json({ message: 'Username already in use' });

    const user = new User(parsed);
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
        avatar: user.avatar,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN } as SignOptions
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: { id: user._id, username: user.username, role: user.role },
      token,
    });
  } catch (err: any) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ message: `${field} already in use` });
    }
    res.status(400).json({ message: err?.message || 'Validation failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.parse(req.body);
    const user = await User.findOne({ email: parsed.email });
    console.log('User found:', user);
    const isMatch = user ? await user.comparePassword(parsed.password) : false;
    console.log('Password match:', isMatch);
    if (!user || !isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, avatar: user.avatar },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      } as SignOptions
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      user: { id: user._id, username: user.username, role: user.role },
      token,
    });
  } catch (err: any) {
    res.status(400).json({ message: err?.message || 'Validation failed' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  });
  res.status(200).json({ success: true, message: 'Logged out' });
};
