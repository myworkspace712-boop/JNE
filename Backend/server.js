import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the Backend folder's .env file
dotenv.config({ path: path.join(__dirname, '.env') });

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import connectDB from './Config/db.js';
import quoteRoutes from './Routes/quoteRoutes.js';
import authRoutes from './Routes/authRoutes.js';

// Connect to MongoDB and then start the server
await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json()); // Parses incoming JSON from the frontend
app.use(cookieParser());

// Session Configuration using express-session package
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// API Routes
app.use('/api/quotes', quoteRoutes);
app.use('/api/auth', authRoutes);

// Base route for testing
app.get('/api', (req, res) => {
  res.send('JN Enterprise API is running...');
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
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Quote Request Endpoint utilizing sessions (Mock/Dummy)
// app.post('/api/quote', (req, res) => {
// ... 
// });

// Finally start the server explicitly after db connect (already awaited above, but we'll start listening here)
app.listen(PORT, () => console.log(`JN Enterprise Backend engine active on port ${PORT}`));