import { Router } from 'express';
import {
  getPosts,
  getPost,
  createPost,
  likePost,
  commentPost,
  commentGetPost,
  updatePost,
  deletePost,
} from '../controllers/postController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/:id/comments', authenticate, commentGetPost);

router.post('/', authenticate, authorize('user', 'admin'), createPost);
router.post('/:id/comments', authenticate, commentPost);
router.patch('/:id/like', authenticate, likePost);
router.delete('/:id', authenticate, authorize('user', 'admin'), deletePost);
router.put('/:id', authenticate, updatePost);

export default router;
