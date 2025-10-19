import express from 'express';
import { authenticate } from '../middleware/auth';
import multer from 'multer';
import { updateUser } from '../controllers/uploadController';

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

router.put('/update', authenticate, upload.single('avatar'), updateUser);

export default router;
