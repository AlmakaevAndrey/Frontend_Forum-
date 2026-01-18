import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

export const connectDB = async (mongoUrl?: string) => {
  const url = mongoUrl || process.env.MONGO_URL;
  if (!url) throw new Error('❌ Нет MONGO_URL');

  try {
    await mongoose.connect(url);
    console.log('✅ MongoDB connected!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};
