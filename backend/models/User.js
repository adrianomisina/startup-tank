import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  role: { 
    type: String, 
    enum: ['startup_founder', 'mentor', 'investor', 'admin'],
    default: 'startup_founder'
  },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
