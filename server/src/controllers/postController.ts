import { Request, Response } from 'express';
import Post from '../models/Post';
import { postCreateSchema } from '../utils/validators';
import mongoose, { SortOrder } from 'mongoose';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(100, Number(req.query.limit) || 10);
    const sortBy = (req.query.sort as string) || 'date';
    const search = (req.query.q as string) || '';

    const filter = search ? { title: { $regex: search, $options: 'i' } } : {};

    const sortObj: { [key: string]: SortOrder } =
      sortBy === 'likes'
        ? { likes: -1 as SortOrder, date: -1 as SortOrder }
        : { date: -1 as SortOrder, likes: -1 as SortOrder };

    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json({ data: posts, meta: { page, limit, total } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const parsed = postCreateSchema.parse(req.body);
    const newPost = new Post(parsed);
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error' });
    }
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const hasLiked = post.likes.some((id) => id.toString() === userId);

    if (hasLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userObjectId);
    }

    await post.save();

    res.json({ likes: post.likes, liked: !hasLiked, count: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const commentPost = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = {
      userId: req.user!.id,
      username: req.user!.username,
      text,
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const commentGetPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post.comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
