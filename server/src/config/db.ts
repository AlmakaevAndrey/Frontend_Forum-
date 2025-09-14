import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const url = process.env.MONGO_URL;

if (!url) {
  throw new Error('❌ Нет MONGO_URL в .env');
}

export const connectDB = async (p0?: string) => {
  try {
    await mongoose.connect(url);
    console.log('MongoDB connected!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();
