import mongoose from 'mongoose';

const investorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  investment_focus: [{ type: String }],
  ticket_size_min: { type: Number, required: true },
  ticket_size_max: { type: Number, required: true },
  portfolio: [{ type: String }], // List of companies/startups
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Investor', investorSchema);
