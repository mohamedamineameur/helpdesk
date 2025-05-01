import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { generateToken } from '../utils/generateToken';
import bcrypt from 'bcryptjs';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    });

    res.json({ message: 'Login successful' });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response) {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
}

export async function me(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  res.json(req.user);
}

