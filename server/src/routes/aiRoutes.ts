import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { generatePost } from '../controllers/aiController';

const router = Router();

router.post('/generate-post', authenticate, generatePost);

export default router;
