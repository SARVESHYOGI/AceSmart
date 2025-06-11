import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next(); 
  } catch (err) {
    res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};
