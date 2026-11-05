import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =======================================================
// GLOBAL PROCESS ERROR HANDLERS (Registered first)
// =======================================================
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ [ANTI-CRASH] Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ [ANTI-CRASH] Uncaught Exception:', error);
});

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
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import connectDB from './Config/db.js';
import quoteRoutes from './Routes/quoteRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import adminRoutes from './Routes/adminRoutes.js';
import MongoStore from 'connect-mongo'; // 1. Import MongoStore
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { getHeroSlides, createHeroSlide, deleteHeroSlide } from './Controllers/heroController.js';
import { uploadHeroImage } from './Middleware/uploadMiddleware.js';
import User from './Models/user.js';


// Function to initialize server and establish resilient database connection
const startServer = async () => {
  try {
    // 1. Establish database connection before accepting traffic
    await connectDB();

    const app = express();
    const PORT = process.env.PORT || 5000;


// Allowed Origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
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
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'x-admin-secret', 'X-Admin-Secret'],
}));

// Handle preflight OPTIONS requests cleanly across all routes (Express 5 pathToRegexp syntax)
app.options(/(.*)/, cors());

// 1. Core Express Parsers MUST come first
app.use(express.json()); // Parses incoming JSON from the frontend
app.use(express.urlencoded({ extended: true }));

// 2. Cookie Parser
app.use(cookieParser());

// 3. EXPRESS 5 PATCH: Unlock req.query & req.params so sanitizers (mongoSanitize, xss-clean) do not crash
app.use((req, res, next) => {
  try {
    const query = { ...req.query };
    Object.defineProperty(req, 'query', {
      value: query,
      writable: true,
      configurable: true,
      enumerable: true,
    });
  } catch (_) {}

  try {
    const params = { ...req.params };
    Object.defineProperty(req, 'params', {
      value: params,
      writable: true,
      configurable: true,
      enumerable: true,
    });
  } catch (_) {}

  next();
});

// 4. Security Sanitizers (Now safe to run)
app.use(mongoSanitize()); // Prevents NoSQL injection (e.g. {"$gt": ""} attacks)
app.use(xss());           // Strips malicious HTML/JavaScript tags from text inputs

// Session Configuration using express-session package
let sessionStore;
try {
  sessionStore = MongoStore.create({
    clientPromise: mongoose.connection.asPromise().then((conn) => conn.getClient()),
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60,
  });

  if (sessionStore.clientP) {
    sessionStore.clientP.catch((err) => {
      console.warn('⚠️ [MongoStore Client Warning]:', err.message);
    });
  }
  if (sessionStore.collectionP) {
    sessionStore.collectionP.catch((err) => {
      console.warn('⚠️ [MongoStore Collection Warning]:', err.message);
    });
  }

  sessionStore.on('error', (err) => {
    console.warn('⚠️ [MongoStore Event Warning]:', err.message);
  });
} catch (storeErr) {
  console.warn('⚠️ [MongoStore Init Warning] Using default in-memory session store:', storeErr.message);
}

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret_key',
  resave: false,
  saveUninitialized: false,
  ...(sessionStore ? { store: sessionStore } : {}),
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
app.post('/api/hero-slides/upload', uploadHeroImage.single('image'), createHeroSlide);
app.delete('/api/hero-slides/:id', deleteHeroSlide);
app.use('/api/quotes', quoteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Configure nodemailer transporter for quote requests (using reliable SSL on port 465 with IPv4)
const quoteTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'yatharthjoshi127@gmail.com',
    pass: (process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || '').replace(/\s+/g, '')
  },
  tls: {
    rejectUnauthorized: false
  },
  family: 4
});

// Test the connection when the server starts
quoteTransporter.verify((error) => {
  if (error) {
    console.log("❌ NODEMAILER ERROR: ", error.message);
  } else {
    console.log("✅ NODEMAILER IS READY TO SEND EMAILS");
  }
});

const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Generous limit so testing isn't prematurely blocked
  message: { success: false, error: 'Too many requests. Please try again later.' }
});

// Apply only to the email route
app.use('/api/request-quote', inquiryLimiter);

// 1. THE INQUIRY ROUTE: Send all quote requests to the admin
app.post('/api/request-quote', async (req, res) => {
  const { Requested_Product, Target_Quantity, Client_Email, Delivery_Destination, Additional_Specifications } = req.body;

  const mailOptions = {
    from: process.env.SMTP_USER || 'yatharthjoshi127@gmail.com', // Your sending email
    to: 'yatharthjoshi127@gmail.com', // ADMIN RECEIVER
    subject: `New B2B Inquiry: ${Requested_Product}`,
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>New Product Inquiry</h2>
        <p><strong>Product:</strong> ${Requested_Product}</p>
        <p><strong>Quantity:</strong> ${Target_Quantity}</p>
        <p><strong>Client Email:</strong> ${Client_Email}</p>
        <p><strong>Destination:</strong> ${Delivery_Destination}</p>
        <p><strong>Specs:</strong> ${Additional_Specifications || 'None'}</p>
      </div>
    `
  };

  try {
    await quoteTransporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('NODEMAILER ERROR:', error);
    res.status(500).json({ success: false, error: 'Failed to send.' });
  }
});

// 2. THE DELETE ROUTE: Clear users with admin secret
app.delete('/api/users/clear', async (req, res) => {
    const clientSecret = req.headers['x-admin-secret'];

    // If the secret doesn't match the .env file, instantly reject it
    if (!clientSecret || clientSecret !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ success: false, error: 'Unauthorized.' });
    }

    try {
        await User.deleteMany({ email: { $ne: process.env.ADMIN_EMAIL } });
        res.status(200).json({ success: true, message: 'Users removed.' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Database error.' });
    }
});

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
  { id: 12, name: 'Paper Bags', category: 'Packaging', description: 'Eco-friendly, durable luxury retail paper bags with rope handles.' },
  { id: 13, name: 'Box Packaging', category: 'Packaging', description: 'Corrugated and rigid custom product boxes engineered for safe shipping.' },
  { id: 14, name: 'Flex Banner Vinyl', category: 'Large Format Signage', description: 'Weatherproof indoor/outdoor high-contrast promotional banners.' },
  { id: 15, name: 'Standee', category: 'Large Format Signage', description: 'Retractable roll-up exhibition standees built for maximum eye-level attention.' },
  { id: 16, name: 'Bar Code Sticker Roll', category: 'Packaging', description: 'Precision thermal barcode labels matching industrial scanning grids.' },
  { id: 17, name: 'Trophies', category: 'Corporate Gifting', description: 'Bespoke acrylic, crystal, and wooden recognition awards.' },
  { id: 18, name: 'Gift Articles', category: 'Corporate Gifting', description: 'Branded premium pens, mugs, tech organizers, and gifting bundles.' }
];

// Product Endpoint
app.get('/api/products', (_req, res) => {
  res.json(products);
});

// 4. GLOBAL EXPRESS ERROR HANDLER (After all routes)
    app.use((err, req, res, _next) => {
      console.error('❌ [ANTI-CRASH] Express Route Error:', err.stack || err);
      const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);
      return res.status(statusCode).json({
        success: false,
        message: "Something went wrong on the server, but it didn't crash!",
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
  }
};

// Execute startup sequence
startServer();
