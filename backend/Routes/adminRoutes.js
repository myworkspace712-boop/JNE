import express from 'express';
import { protect, isAdmin } from '../Middleware/authMiddleware.js';
import { getDashboardData, deleteUser } from '../Controllers/adminController.js';
import { getAllQuotes, updateQuoteStatus } from '../Controllers/quoteController.js';
import {
  getAdminHeroSlides,
  createHeroSlide,
  deleteHeroSlide,
} from '../Controllers/heroController.js';
import { uploadHeroImage } from '../Middleware/uploadMiddleware.js';

const router = express.Router();

// Apply protect and isAdmin middleware to all routes in this file
router.use(protect);
router.use(isAdmin);

router.get('/dashboard', getDashboardData);
router.get('/all-quotes', getAllQuotes);
router.patch('/update-quote/:id', updateQuoteStatus);

// User Management Endpoint
router.delete('/users/:id', deleteUser);

// Hero Carousel Admin Endpoints
router.get('/hero-slides', getAdminHeroSlides);
router.post('/hero-slides', uploadHeroImage.single('image'), createHeroSlide);
router.delete('/hero-slides/:id', deleteHeroSlide);

export default router;

