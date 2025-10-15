import { Router } from 'express';
import { getUsers } from '../controllers/userControllers';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
console.log('Users route connected');
router.get('/', authenticate, authorize('admin'), getUsers);
export default router;
