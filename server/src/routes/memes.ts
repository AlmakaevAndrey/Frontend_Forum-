import { Router } from 'express';
import {
  getMeme,
  createMeme,
  likeMeme,
  getMemes,
} from '../controllers/memesControllers';
import { authenticate, authorize } from '../middleware/auth';
import { createUploader } from '../middleware/uploads';

const router = Router();

const memeUpload = createUploader('');

router.get('/', getMemes);
router.get('/:id', getMeme);

router.post(
  '/',
  authenticate,
  authorize('user', 'admin'),
  memeUpload.single('image'),
  createMeme
);

router.post('/:id/like', authenticate, likeMeme);

export default router;
