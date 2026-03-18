import 'dotenv/config';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import startupRoutes from './routes/startups.js';
import mentorRoutes from './routes/mentors.js';
import investorRoutes from './routes/investors.js';
import interactionRoutes from './routes/interactions.js';
import paymentRoutes from './routes/payment.js';
import { verifyToken } from './middleware/auth.js';



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Database Connection
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/startup-tank';
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Socket.io
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/investors', investorRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.send('StartupTank API is running...');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
