import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import bcrypt from 'bcrypt';

import apiRoutes from './routes/api';
import { User } from './models/User';
import { verifyMailer } from './utils/mailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ── 1. Production-Ready CORS Configuration ─────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'https://sharvil.vercel.app',
  process.env.CLIENT_URL // Fallback if set in env
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (e.g., Postman, server-to-server)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // CORS Debug Logging (Very useful for Render/Vercel debugging)
    console.warn(`[CORS] Blocked request from unauthorized origin: ${origin}`);
    callback(new Error(`CORS policy: The origin ${origin} is not allowed.`));
  },
  credentials: true, // Crucial for sending cookies/JWT across subdomains
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// ── 2. Core Middleware ────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(NODE_ENV === 'production' ? morgan('combined') : morgan('dev'));
app.use(cookieParser());

// ── 3. Static Asset Serving ───────────────────────────────────────────────────
app.use('/certificates', express.static(path.join(__dirname, '../../frontend/public/certificates')));

// ── 4. Robust MongoDB Connection Handling ─────────────────────────────────────
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
    
    console.log(`[DB] Attempting connection to MongoDB...`);
    
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Fail fast if Atlas is blocking IP
      socketTimeoutMS: 45000,
    });
    
    console.log(`[DB] ✅ MongoDB Connected Successfully: ${conn.connection.host}`);

    // Seed default admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPass  = process.env.ADMIN_PASS  || 'admin123';
    
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      const hashed = await bcrypt.hash(adminPass, 12);
      await User.create({ username: 'Admin', email: adminEmail, password: hashed, role: 'admin' });
      console.log(`[DB] 🛡️ Default Admin seeded: ${adminEmail}`);
    }

    // SMTP check (Non-blocking)
    verifyMailer().catch(() => console.warn(`[MAILER] ⚠️ SMTP setup pending or failed.`));

  } catch (error: any) {
    console.error(`[DB] ❌ MongoDB Connection Error:`, error.message);
    if (error.message.includes('bad auth')) {
      console.error(`[DB] 💡 FIX: Check your MONGO_URI username and password.`);
    } else if (error.message.includes('timeout')) {
      console.error(`[DB] 💡 FIX: Ensure Render IP (0.0.0.0/0) is whitelisted in MongoDB Atlas Network Access.`);
    }
    process.exit(1);
  }
};

// ── 5. Routes ─────────────────────────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Backend is healthy', env: NODE_ENV });
});

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Portfolio API is running flawlessly', env: NODE_ENV });
});

app.use('/api', apiRoutes);

// ── 6. Global Async Error Handler ──────────────────────────────────────────────
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Don't leak stack traces in production
  const errorResponse = {
    message: err.message || 'Internal Server Error',
    ...(NODE_ENV !== 'production' && { stack: err.stack }),
  };

  console.error(`[ERROR] ${req.method} ${req.url} -> ${err.message}`);
  res.status(statusCode).json(errorResponse);
});

// ── 7. Server Startup ─────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`[SERVER] 🚀 Starting up...`);
  await connectDB();
  console.log(`[SERVER] ✅ Running on port ${PORT} in ${NODE_ENV} mode.`);
  console.log(`[CORS] Allowed Origins:`, allowedOrigins.join(', '));
});
