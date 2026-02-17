import { Router } from 'express';
import {
  register,
  login,
  logout,
  refresh,
} from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refresh);

router.get('/check', authenticate, (req, res) => {
  res.json({ success: true, message: 'Auth', user: req.user });
});

export default router;
