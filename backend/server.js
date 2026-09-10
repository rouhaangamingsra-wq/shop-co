import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { firebaseEnabled } from './src/config/firebase.js';
import errorHandler from './src/middleware/errorHandler.js';
import ApiError from './src/utils/ApiError.js';

import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';

const app = express();

// ---- Security & logging middleware -----------------------------------------
app.use(helmet());
const configuredOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (configuredOrigins.includes(origin)) return callback(null, true);
      if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        return callback(null, true);
      }
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

// ---- Health check ----------------------------------------------------------
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    status: 'ok',
    firebaseEnabled,
    timestamp: new Date().toISOString(),
  });
});

// ---- API routes ------------------------------------------------------------
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

// ---- 404 handler -----------------------------------------------------------
app.use((req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
});

// ---- Central error handler -------------------------------------------------
app.use(errorHandler);

export { app };
export default app;
