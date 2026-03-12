import mongoose from 'mongoose';

const investmentInterestSchema = new mongoose.Schema({
  startupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
  investorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Investor', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'contacted', 'rejected', 'invested'],
    default: 'pending'
  },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('InvestmentInterest', investmentInterestSchema);
