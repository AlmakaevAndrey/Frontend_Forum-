import { Request, Response } from 'express';
import Post from '../models/Post';
import { postCreateSchema } from '../utils/validators';
import mongoose, { SortOrder } from 'mongoose';
import User, { IUser } from '../models/User';

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
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(req.user.id).select('username avatar');

    if (!user) return res.status(404).json({ message: 'User not found' });

    const parsed = postCreateSchema.parse(req.body);

    const newPost = new Post({
      ...parsed,
      author: user.username,
      authorAvatar: user.avatar ? `/uploads/${user.avatar}` : '',
      userId: req.user.id,
    });

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
    if (!req.user) {
      console.log('Unauthorized: no req.user');
      return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log('req.user', req.user);

    const { text } = req.body;
    if (!text || !text.trim()) {
      console.log('Validation failed: empty text');
      return res.status(400).json({ message: 'Text is required' });
    }

    const user = (await User.findById(req.user.id).select(
      'username'
    )) as IUser & { _id: string };
    if (!user) {
      console.log('User not found for id', req.user.id);
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.username) {
      console.log('User has no username for id', req.user.id);
      return res.status(500).json({ message: 'User has no username' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      console.log('Post not found for id', req.params.id);
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = {
      userId: user._id.toString(),
      username: user.username,
      text,
      createdAt: new Date(),
    };
    console.log('Comment to add', comment);

    post.comments.push(comment);

    await post.save();
    console.log('Comment added successfully');

    res.status(201).json(comment);
  } catch (err) {
    console.error('Error in comment Post', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const commentGetPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const sortedComments = post.comments.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    res.json(sortedComments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, excerpt } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (req.user?.role !== 'admin' && req.user?.username !== post.author) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (title) post.title = title;
    if (excerpt) post.excerpt = excerpt;

    const updated = await post.save();
    res.json(updated);
  } catch (error) {
    console.error('Error updating post', error);
    res.status(500).json({ message: 'Server error' });
  }
};
