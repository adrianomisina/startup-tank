import express from 'express';
import Startup from '../models/Startup.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all approved startups
router.get('/', async (req, res) => {
  try {
    const startups = await Startup.find({ isApproved: true }).populate('founderId', 'name email');
    res.json(startups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new startup
router.post('/', verifyToken, async (req, res) => {
  try {
    const newStartup = new Startup({
      ...req.body,
      founderId: req.user.id
    });
    const savedStartup = await newStartup.save();
    res.status(201).json(savedStartup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single startup
router.get('/:id', async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id).populate('founderId', 'name email');
    if (!startup) return res.status(404).json({ message: 'Startup not found' });
    res.json(startup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
