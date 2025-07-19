import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import debugRoutes from './routes/debug.route.js';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/debug', debugRoutes);
app.listen(PORT, () => {
  console.log(`Server is Running at port ${PORT}`);
  connectDB();
});
