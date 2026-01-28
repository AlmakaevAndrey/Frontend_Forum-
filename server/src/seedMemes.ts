import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Meme from './models/Meme';

dotenv.config();

const memesToInsert = [
  {
    imgURL:
      'https://res.cloudinary.com/dp3smoem8/image/upload/v1763887448/jfyvkmcg_nwjkwa.webp',
  },
  {
    imgURL:
      'https://res.cloudinary.com/dp3smoem8/image/upload/v1763887446/image12-1-768x733_sr5czw.jpg',
    author: 'Admin',
    likes: [],
  },
  {
    imgURL:
      'https://res.cloudinary.com/dp3smoem8/image/upload/v1763887447/image13-768x730_cnnij8.jpg',
    author: 'Admin',
    likes: [],
  },
  {
    imgURL:
      'https://res.cloudinary.com/dp3smoem8/image/upload/v1763887445/image9-5-768x432_n4ci0p.png',
    author: 'Admin',
    likes: [],
  },
  {
    imgURL:
      'https://res.cloudinary.com/dp3smoem8/image/upload/v1763887443/image8-768x669_tuo4si.jpg',
    author: 'Admin',
    likes: [],
  },
  {
    imgURL:
      'https://res.cloudinary.com/dp3smoem8/image/upload/v1763887442/image7-1_m1oby2.jpg',
    author: 'Admin',
    likes: [],
  },
  {
    imgURL:
      'https://res.cloudinary.com/dp3smoem8/image/upload/v1763887441/image6-11-768x1087_nsuhow.png',
    author: 'Admin',
    likes: [],
  },
  {
    imgURL:
      'https://res.cloudinary.com/dp3smoem8/image/upload/v1763887441/image5-9-768x787_zrrjlb.png',
    author: 'Admin',
    likes: [],
  },
  {
    imgURL:
      'https://res.cloudinary.com/dp3smoem8/image/upload/v1763887439/6fkuwudf_hmtg9x.webp',
    author: 'Admin',
    likes: [],
  },
  {
    imgURL:
      'https://res.cloudinary.com/dp3smoem8/image/upload/v1763887441/image1-12-768x768_wpvq15.png',
    author: 'Admin',
    likes: [],
  },
  {
    imgURL:
      'https://res.cloudinary.com/dp3smoem8/image/upload/v1763887440/6rkrc4nu_c2mnfy.jpg',
    author: 'Admin',
    likes: [],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log('Connected to MongoDB');

    await Meme.insertMany(memesToInsert);
    console.log('Memes inserted successfully');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error(err);
  }
}

seed();
