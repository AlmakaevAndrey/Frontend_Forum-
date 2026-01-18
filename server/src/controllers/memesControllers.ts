import Meme, { IMeme } from '../models/Meme';
import { Request, Response } from 'express';
import { memeCreateSchema } from '../utils/validators';
import mongoose, { SortOrder } from 'mongoose';
import User from '../models/User';
import cloudinary from '../config/cloudinary';
import { resourceLimits } from 'worker_threads';

export const getMeme = async (req: Request, res: Response) => {
  try {
    const meme = await Meme.findById(req.params.id);
    if (!meme) return res.status(404).json({ message: 'Not found' });
    res.json(meme);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMemes = async (req: Request, res: Response) => {
  try {
    const memes = await Meme.find().sort({ date: -1 }).lean();
    res.json(memes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createMeme = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const user = await User.findById(req.user.id).select('username');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'memes',
      resource_type: 'image',
    });

    const newMeme = new Meme({
      imgURL: result.secure_url,
      author: user.username || 'User',
      authorAvatar: user.avatar || '',
      likes: [],
    });

    const saved = await newMeme.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error' });
    }
  }
};

export const likeMeme = async (req: Request, res: Response) => {
  try {
    const meme = await Meme.findById(req.params.id);
    if (!meme) return res.status(404).json({ message: 'Meme not found' });

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const hasLiked = meme.likes.some((id) => id.toString() === userId);

    if (hasLiked) {
      meme.likes = meme.likes.filter((id) => id.toString() !== userId);
    } else {
      meme.likes.push(userObjectId);
    }

    await meme.save();

    res.json({ likes: meme.likes, liked: !hasLiked, count: meme.likes.length });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
