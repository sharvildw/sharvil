import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { verifyMailer } from './utils/mailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:4173', // vite preview
];

app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

// ── Core middleware ───────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(NODE_ENV === 'production' ? morgan('combined') : morgan('dev'));
app.use(cookieParser());

// ── Static files (for production: serve uploaded cert files) ─────────────────
app.use('/certificates', express.static(path.join(__dirname, '../../frontend/public/certificates')));

import { User } from './models/User';
import bcrypt from 'bcrypt';

// ── DB Connection + seeding ───────────────────────────────────────────────────
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio'
    );
    console.log(`[DB] Connected: ${conn.connection.host}`);

    // Seed admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPass  = process.env.ADMIN_PASS  || 'admin123';
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      const hashed = await bcrypt.hash(adminPass, 12);
      await User.create({ username: 'Admin', email: adminEmail, password: hashed, role: 'admin' });
      console.log(`[DB] Admin seeded: ${adminEmail}`);
    }

    // Verify SMTP (non-blocking — won't crash server on failure)
    verifyMailer().catch(() => {});

  } catch (error) {
    console.error('[DB] Connection failed:', error);
    process.exit(1);
  }
};

import apiRoutes from './routes/api';

// ── Routes ────────────────────────────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => res.json({ status: 'ok', env: NODE_ENV }));
app.get('/', (_req: Request, res: Response) => res.json({ message: 'Portfolio API is running', env: NODE_ENV }));
app.use('/api', apiRoutes);

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error('[ERROR]', err.message);
  res.status(statusCode).json({
    message: err.message,
    ...(NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  await connectDB();
  console.log(`[SERVER] Running on port ${PORT} (${NODE_ENV})`);
});
