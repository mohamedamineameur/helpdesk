import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword, role });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function getAllUsers(req: Request, res: Response) {
  const users = await User.findAll();
  res.json(users);
}

export async function getUserById(req: Request, res: Response) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, email, role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = username ?? user.username;
    user.email = email ?? user.email;
    user.role = role ?? user.role;

    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req: Request, res: Response) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.destroy();
  res.json({ message: 'User deleted' });
}

export async function toggleUserStatus(req: Request, res: Response) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.isActive = !user.isActive;
  await user.save();
  res.json(user);
}
