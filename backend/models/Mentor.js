import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  bio: { type: String, required: true },
  expertise: [{ type: String }], // Array of strings for areas of expertise
  years_experience: { type: Number, required: true },
  hourly_rate: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  isApproved: { type: Boolean, default: false },
  availability: { type: Object }, // Could be a complex JSON for calendar
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Mentor', mentorSchema);
