import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { existsSync } from 'fs';
import authRoutes from './routes/auth';
import postsRoutes from './routes/posts';
import uploadRoutes from './routes/upload';
import usersRoutes from './routes/user';
import memesRoutes from './routes/memes';
import memesAiRoutes from './routes/aiRoutes';
import path from 'path';
import { registerFont } from 'canvas';

dotenv.config();

registerFont(path.join(__dirname, '../src/fonts/roboto-v49-latin-200.woff2'), {
  family: 'Roboto',
});
registerFont(path.join(__dirname, '../src/fonts/roboto-v49-latin-700.woff2'), {
  family: 'Roboto',
});

const app = express();

const allowedOrigins = [
  'https://frontend-forum.vercel.app', // прод-домен
  'http://localhost:3000', // dev
];

function isVercelPreview(origin: string | string[]) {
  return (
    origin && origin.includes('vercel.app') && origin.includes('frontend-forum')
  );
}
//
// app.use((req, res, next) => {
//   console.log(`➡️ ${req.method} ${req.url}`);
//   next();
// });

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin) || isVercelPreview(origin)) {
        return callback(null, true);
      }

      console.log('❌ CORS BLOCKED:', origin);
      return callback(new Error('CORS blocked: ' + origin));
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(cookieParser());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);
app.use('/upload', uploadRoutes);
app.use('/memes', memesRoutes);
app.use('/ai', memesAiRoutes);

if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../../client/build');

  if (existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));

    app.use((req, res, next) => {
      if (
        !req.path.startsWith('/uploads') &&
        !req.path.startsWith('/auth') &&
        !req.path.startsWith('/users') &&
        !req.path.startsWith('/posts') &&
        !req.path.startsWith('/memes') &&
        !req.path.startsWith('/upload')
      ) {
        res.sendFile(path.join(clientBuildPath, 'index.html'));
      } else {
        next();
      }
    });
  } else {
    console.warn('Client build folder not found, skipping static serving');
  }
}

// Глобальный обработчик ошибок
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('🔴 Global error handler caught:', err);
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
    });
  }
);

export default app;
