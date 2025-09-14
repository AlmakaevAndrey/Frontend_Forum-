import { Router } from 'express';
import {
  getPosts,
  getPost,
  createPost,
  likePost,
} from '../controllers/postController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', authenticate, authorize('user', 'admin'), createPost);
router.patch('/:id/like', authenticate, likePost);

export default router;
