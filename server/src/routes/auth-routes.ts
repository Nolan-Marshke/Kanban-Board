import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
 
  try {
    const user = await User.findOne({where: { username }});
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const secret = process.env.JWT_SECRET || '';
    const token = jwt.sign({ username: user.username }, secret, { expiresIn: '2h' });

    res.json({ token, username: user.username });
  } catch (error) {
    console.error('Login Error', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
