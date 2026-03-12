import mongoose from 'mongoose';

const mentorshipRequestSchema = new mongoose.Schema({
  startupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  message: { type: String },
  scheduledDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('MentorshipRequest', mentorshipRequestSchema);
