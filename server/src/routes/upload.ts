import express from 'express';
import { authenticate } from '../middleware/auth';
import multer from 'multer';
import path from 'path';
import { uploadAvatar } from '../controllers/uploadController';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/avatar', authenticate, upload.single('avatar'), uploadAvatar);

export default router;
