import { Router } from 'express';
import {
  getPosts,
  getPost,
  createPost,
  likePost,
  commentPost,
  commentGetPost,
} from '../controllers/postController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/:id/comments', authenticate, commentGetPost);

router.post('/', authenticate, authorize('user', 'admin'), createPost);
router.post('/:id/comments', authenticate, commentPost);
router.patch('/:id/like', authenticate, likePost);

export default router;
