import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema({
  founderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  industry: { type: String, required: true },
  stage: { 
    type: String, 
    enum: ['Idea', 'MVP', 'Pre-seed', 'Seed', 'Series A', 'Scale-up'],
    required: true 
  },
  website: { type: String },
  pitch_deck_url: { type: String },
  team_size: { type: Number },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Startup', startupSchema);
