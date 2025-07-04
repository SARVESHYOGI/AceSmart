import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface Decoded {
  id: string;
  role: string;
}

// ✅ Middleware to verify JWT and attach user to req
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }
  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as Decoded;
    console.log("Token decoded:", decoded);

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
};

// ✅ Middleware to protect routes by role
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Forbidden: Insufficient role' });
      return;
    }
    next();
  };
};
