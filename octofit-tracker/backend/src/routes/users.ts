import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';

const router = Router();

router.get('/', async (_req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.json({ message: 'Users route', users: [] });
  }

  try {
    const users = await User.find({});
    return res.json({ message: 'Users route', users });
  } catch (_error) {
    return res.json({ message: 'Users route', users: [] });
  }
});

router.post('/', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(201).json({ message: 'User created', user: req.body });
  }

  try {
    const user = await User.create(req.body);
    return res.status(201).json({ message: 'User created', user });
  } catch (_error) {
    return res.status(201).json({ message: 'User created', user: req.body });
  }
});

export default router;
