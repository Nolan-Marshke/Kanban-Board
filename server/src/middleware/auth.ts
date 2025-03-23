import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET_KEY || '';
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = { username: decoded.username };
    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }
};