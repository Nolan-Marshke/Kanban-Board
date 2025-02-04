import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';   // Assuming your User model is in 'models/user.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Login function
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // 1. Check if the user exists
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Generate a JWT token if credentials are valid
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY || 'default_secret', {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // 4. Send the JWT token back to the client
    res.json({ message: 'Logged in successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
