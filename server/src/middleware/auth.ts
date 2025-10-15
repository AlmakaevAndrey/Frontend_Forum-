import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

declare global {
  namespace Express {
    interface Request {
      user?: {
        username: string;
        id: string;
        role: string;
        avatar: string;
      };
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Incoming request headers:', req.headers);
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  console.log('Token:', token);

  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: string;
      username: string;
      avatar: string;
    };
    console.log('Decoded user:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT error:', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void | Response => {
    const user = req.user;
    console.log('User role:', user?.role);
    if (!user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (roles.length > 0 && (!user.role || !roles.includes(user.role))) {
      return res.status(403).json({ message: 'Нет доступа' });
    }

    next();
  };
