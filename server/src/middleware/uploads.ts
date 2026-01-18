import { existsSync, mkdirSync } from 'fs';
import multer from 'multer';
import path from 'path';

export const createUploader = (folder: string) => {
  const uploadPath = folder ? `uploads/${folder}` : `uploads`;
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
  }

  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        cb(
          null,
          Date.now() +
            '-' +
            Math.floor(Math.random() * 1e9) +
            path.extname(file.originalname)
        );
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        cb(new Error('Only images allowed'));
      } else {
        cb(null, true);
      }
    },
  });
};
