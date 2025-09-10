import { Router } from 'express';
import Post from '../models/Post';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});

router.post('/', authenticate, authorize('user', 'admin'), async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

router.patch('/:id/like', authenticate, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  post.likes += 1;
  await post.save();
  res.json(post);
});

export default router;
