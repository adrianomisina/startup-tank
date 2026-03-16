import express from 'express';
import Mentor from '../models/Mentor.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get current user mentor profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ userId: req.user.id }).populate('userId', 'name email profilePicture');
    if (!mentor) {
      return res.status(404).json({ message: 'Perfil de mentor não encontrado.' });
    }
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all approved mentors
router.get('/', async (req, res) => {
  try {
    const mentors = await Mentor.find({ isApproved: true }).populate('userId', 'name email profilePicture');
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create/Update mentor profile
router.post('/', verifyToken, async (req, res) => {
  try {
    let mentor = await Mentor.findOne({ userId: req.user.id });
    if (mentor) {
      mentor = await Mentor.findOneAndUpdate({ userId: req.user.id }, req.body, { new: true });
    } else {
      mentor = new Mentor({ ...req.body, userId: req.user.id });
      await mentor.save();
    }
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
