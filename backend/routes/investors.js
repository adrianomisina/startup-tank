import express from 'express';
import Investor from '../models/Investor.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all investors
router.get('/', async (req, res) => {
  try {
    const investors = await Investor.find().populate('userId', 'name email profilePicture');
    res.json(investors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create/Update investor profile
router.post('/', verifyToken, async (req, res) => {
  try {
    let investor = await Investor.findOne({ userId: req.user.id });
    if (investor) {
      investor = await Investor.findOneAndUpdate({ userId: req.user.id }, req.body, { new: true });
    } else {
      investor = new Investor({ ...req.body, userId: req.user.id });
      await investor.save();
    }
    res.json(investor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
