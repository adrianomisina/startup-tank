import express from 'express';
import MentorshipRequest from '../models/MentorshipRequest.js';
import InvestmentInterest from '../models/InvestmentInterest.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Request Mentorship
router.post('/mentorship', verifyToken, async (req, res) => {
  try {
    const request = new MentorshipRequest(req.body);
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Express Investment Interest
router.post('/investment', verifyToken, async (req, res) => {
  try {
    const interest = new InvestmentInterest(req.body);
    await interest.save();
    res.status(201).json(interest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user interactions (requests sent/received)
router.get('/my-requests', verifyToken, async (req, res) => {
  try {
    const mentorships = await MentorshipRequest.find({ 
      $or: [{ startupId: req.user.id }, { mentorId: req.user.id }] 
    }).populate('startupId mentorId');
    
    const investments = await InvestmentInterest.find({ 
      $or: [{ startupId: req.user.id }, { investorId: req.user.id }] 
    }).populate('startupId investorId');

    res.json({ mentorships, investments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
