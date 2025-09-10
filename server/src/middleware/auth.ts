import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ massage: 'No token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as (id: string, role: string);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({message: "Invalid token"})
  }
};

export const authorize = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) return res.status(403).json({message: "Forbidden"});
    next();
}
