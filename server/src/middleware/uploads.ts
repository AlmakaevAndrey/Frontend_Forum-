import multer from 'multer';

export const createUploader = () => {
  return multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        cb(new Error('Only images allowed'));
      } else {
        cb(null, true);
      }
    },
    limits: { fileSize: 5 * 1024 * 1024 },
  });
};
