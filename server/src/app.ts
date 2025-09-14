import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth';
import postsRoutes from './routes/posts';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);

export default app;
