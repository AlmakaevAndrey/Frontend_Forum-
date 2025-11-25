import { Router } from 'express';
import {
  getMeme,
  createMeme,
  likeMeme,
  getMemes,
} from '../controllers/memesControllers';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getMemes);
router.get('/:id', getMeme);

router.post('/', authenticate, authorize('user', 'admin'), createMeme);
router.post('/:id/like', authenticate, likeMeme);

export default router;
