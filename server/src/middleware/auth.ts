import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define JwtPayload interface to structure the decoded token
interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // 1. Get the token from the Authorization header (Bearer <token>)
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token after "Bearer"
  
  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  // 2. Verify the token using jwt.verify()
  jwt.verify(token, process.env.JWT_SECRET_KEY || '', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    // 3. If the token is valid, attach the decoded user data to the request object
    req.user = decoded as JwtPayload; // Store user data from token payload

    // 4. Call next() to pass control to the next middleware or route handler
    next();
  });
};
