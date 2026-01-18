import Meme from '../models/Meme';
import { Request, Response } from 'express';
import mongoose, { SortOrder } from 'mongoose';
import User from '../models/User';
import cloudinary from '../config/cloudinary';
import streamifier from 'streamifier';

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
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!req.file)
      return res.status(400).json({ message: 'Image is required' });

    const user = await User.findById(req.user.id).select('username avatar');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const file = req.file;

    const streamUpload = () =>
      new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'memes', resource_type: 'image' },
          (error, result) => {
            if (result) resolve(result.secure_url);
            else reject(error);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });

    const imageUrl = await streamUpload();

    const newMeme = new Meme({
      imgURL: imageUrl,
      author: user.username || 'User',
      authorAvatar: user.avatar || '',
      likes: [],
    });

    const saved = await newMeme.save();
    res.status(201).json(saved);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Internal server error' });
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
