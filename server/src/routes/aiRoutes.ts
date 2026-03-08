import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { generateMeme, generatePost } from '../controllers/aiController';

const router = Router();

router.post('/generate-post', authenticate, generatePost);
router.post('/generate-meme', authenticate, generateMeme);

export default router;
