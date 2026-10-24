import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the Backend folder's .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// =======================================================
// CRITICAL ENVIRONMENT VARIABLE VALIDATION
// =======================================================
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'SESSION_SECRET'];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('\n======================================================');
  console.error('❌ [MISSING ENV VAR WARNING] Critical environment variables missing:');
  missingEnvVars.forEach((v) => console.error(`   -> ${v}`));
  console.error('⚠️ Please add them to your .env file or Render Environment tab!');
  console.error('======================================================\n');
} else {
  console.log('✅ [Env Check] All critical environment variables present.');
}

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import connectDB from './Config/db.js';
import quoteRoutes from './Routes/quoteRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import adminRoutes from './Routes/adminRoutes.js';
import MongoStore from 'connect-mongo'; // 1. Import MongoStore
import mongoose from 'mongoose';
import { getHeroSlides } from './Controllers/heroController.js';


// Function to initialize server and establish resilient database connection
const startServer = async () => {
  try {
    // 1. Kick off database connection with automatic 5s retry loop
    connectDB();

    const app = express();
    const PORT = process.env.PORT || 5000;


// Allowed Origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'https://jne-seven.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

// CORS configuration with preflight handling
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Handle preflight OPTIONS requests cleanly across all routes (Express 5 pathToRegexp syntax)
app.options(/(.*)/, cors());

// MUST be before routes to parse body
app.use(express.json()); // Parses incoming JSON from the frontend
app.use(cookieParser());

// Session Configuration using express-session package
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret_key',
  resave: false,
  saveUninitialized: false,
  // 2. Add this store option to save sessions in MongoDB!
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // Uses your existing MongoDB Atlas connection
    collectionName: 'sessions',      // Creates a 'sessions' collection in your DB
    ttl: 14 * 24 * 60 * 60,          // Automatically deletes sessions after 14 days
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Serve static uploads directory for uploaded hero carousel images
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Breadcrumb Request Logger Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`📡 [${timestamp}] Incoming Request: ${req.method} ${req.originalUrl || req.url} | IP: ${req.ip || req.headers['x-forwarded-for'] || 'unknown'}`);
  
  // Track response completion & timing
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`🏁 [${new Date().toISOString()}] Completed: ${req.method} ${req.originalUrl || req.url} -> Status ${res.statusCode} (${duration}ms)`);
  });

  next();
});

// API Routes
app.get('/api/hero-slides', getHeroSlides);
app.use('/api/quotes', quoteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Health check route for Render & monitoring (returns DB connection state)
app.get('/api/health', (_req, res) => {
  const dbStateMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.status(200).json({ 
    status: 'OK', 
    dbState: dbStateMap[mongoose.connection.readyState] || 'unknown',
    readyState: mongoose.connection.readyState,
    timestamp: new Date().toISOString()
  });
});

// Base route for testing
app.get('/', (_req, res) => {
  res.send('JNE API is live and running...');
});
app.get('/api', (_req, res) => {
  res.send('JNE API is running...');
});

// Full product matrix specified for JN Enterprise
const products = [
  { id: 1, name: 'Business Cards', category: 'Corporate Stationery', description: 'Premium quality corporate cards with matte, glossy, or textured finishes.' },
  { id: 2, name: 'Letter Head', category: 'Corporate Stationery', description: 'Official executive letterheads printed on high-grade bond papers.' },
  { id: 3, name: 'Envelopes', category: 'Corporate Stationery', description: 'Custom branded envelopes available in standard business and window variants.' },
  { id: 4, name: 'Brochures', category: 'Marketing Material', description: 'Bi-fold, tri-fold, and multi-page marketing collateral for business portfolios.' },
  { id: 5, name: 'Catalogues', category: 'Marketing Material', description: 'High-definition product catalogs showcasing your inventory beautifully.' },
  { id: 6, name: 'Flyers', category: 'Marketing Material', description: 'High-volume promotional flyers for events and micro-marketing campaigns.' },
  { id: 7, name: 'Calendar Diary', category: 'Corporate Gifting', description: 'Customized annual diaries, desktop planners, and wall calendars.' },
  { id: 8, name: 'Folders', category: 'Corporate Stationery', description: 'Presentation folders featuring integrated document slots and card holders.' },
  { id: 9, name: 'ID Card', category: 'Corporate Identity', description: 'Secure PVC identity cards for staff with crisp photo printing.' },
  { id: 10, name: 'Corporate Invitation', category: 'Marketing Material', description: 'Elegant, premium invitation cards for corporate galas and product launches.' },
  { id: 11, name: 'Annual Reports', category: 'Corporate Identity', description: 'Professional booklet printing and binding for stakeholder distribution.' },
  { id: 12, name: 'Paper Bag', category: 'Packaging', description: 'Eco-friendly, durable luxury retail paper bags with rope handles.' },
  { id: 13, name: 'Packing Box', category: 'Packaging', description: 'Corrugated and rigid custom product boxes engineered for safe shipping.' },
  { id: 14, name: 'Flex Banner Vinyl', category: 'Large Format Signage', description: 'Weatherproof indoor/outdoor high-contrast promotional banners.' },
  { id: 15, name: 'Standee', category: 'Large Format Signage', description: 'Retractable roll-up exhibition standees built for maximum eye-level attention.' },
  { id: 16, name: 'Bar Code Sticker Roll', category: 'Packaging', description: 'Precision thermal barcode labels matching industrial scanning grids.' },
  { id: 17, name: 'Trophies', category: 'Corporate Gifting', description: 'Bespoke acrylic, crystal, and wooden recognition awards.' },
  { id: 18, name: 'Corporate Gift Articles', category: 'Corporate Gifting', description: 'Branded premium pens, mugs, tech organizers, and corporate bundles.' }
];

// Product Endpoint
app.get('/api/products', (_req, res) => {
  res.json(products);
});

// Global Express Error-Handling Middleware (catches all errors passed via next(err))
    app.use((err, req, res, _next) => {
      console.error(`💥 [Express Global Error Handler] Error on ${req.method} ${req.originalUrl || req.url}:`);
      console.error(err.stack || err);

      const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);
      return res.status(statusCode).json({
        success: false,
        error: err.message || 'Internal Server Error'
      });
    });

    // ADD '0.0.0.0' AS THE SECOND ARGUMENT HERE:
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 [Server Status] Server is up and listening on port ${PORT}`);
      console.log(`🌐 [Server Status] Ready to accept requests from frontend`);
    });
  } catch (error) {
    console.error('❌ [Fatal Startup Error] Failed to start server:', error.message);
    process.exit(1);
  }
};

// Catch unhandled promise rejections (e.g., failed database saves)
process.on('unhandledRejection', (err) => {
  console.error('❌ UNHANDLED REJECTION! Keeping server alive...');
  console.error(err?.name || 'Error', err?.message || err);
});

// Catch synchronous exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION! Keeping server alive...');
  console.error(err?.name || 'Error', err?.message || err);
});

// Execute startup sequence
startServer();
