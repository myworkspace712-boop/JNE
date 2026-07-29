import express from 'express';
import { registerUser, verifyEmail, loginUser, loginAdmin } from '../Controllers/authController.js';
import { protect, adminOnly } from '../Middleware/authMiddleware.js';
import { getAllQuotes, updateQuoteStatus } from '../Controllers/quoteController.js';


const router = express.Router();

router.post('/register', registerUser);
router.get('/verify/:token', verifyEmail);
router.post('/login', loginUser);
router.post('/admin-login', loginAdmin);

// CLIENT ROUTE: Any logged-in user can view their profile
router.get('/profile', protect, (req, res) => {
    res.json(req.user);
});

// ADMIN ROUTES: Must pass BOTH 'protect' (logged in) AND 'adminOnly' (role === 'admin')
router.get('/all-quotes', protect, adminOnly, getAllQuotes);
router.patch('/update-quote/:id', protect, adminOnly, updateQuoteStatus);

export default router;