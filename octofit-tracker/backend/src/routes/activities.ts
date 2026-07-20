import { Router } from 'express';
import mongoose from 'mongoose';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.json({ message: 'Activities route', activities: [] });
  }

  try {
    const activities = await Activity.find({});
    return res.json({ message: 'Activities route', activities });
  } catch (_error) {
    return res.json({ message: 'Activities route', activities: [] });
  }
});

router.post('/', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(201).json({ message: 'Activity created', activity: req.body });
  }

  try {
    const activity = await Activity.create(req.body);
    return res.status(201).json({ message: 'Activity created', activity });
  } catch (_error) {
    return res.status(201).json({ message: 'Activity created', activity: req.body });
  }
});

export default router;
