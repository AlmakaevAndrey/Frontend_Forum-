import mongoose from 'mongoose';

export const connectDB = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log('MongoDB connected!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
