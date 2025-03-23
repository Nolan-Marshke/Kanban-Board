import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object

  export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.sendStatus(401),json({ message: 'Unauthorized' });
    }

    try {
      const secret = process.env.JWT_SECRET || '';
      const decoded = jwt.verify(token, secret) as JwtPayload;
      req.user = { username: decoded.username };
      next();

    } catch (error) {
      return res.sendStatus(403).json({ message: 'Forbidden' });
    }
};
