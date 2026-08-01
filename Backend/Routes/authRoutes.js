import express from 'express';
import { registerUser, verifyAccount, loginUser, loginAdmin } from '../Controllers/authController.js';
import { getDashboardData } from '../Controllers/adminController.js';
import { protect, isAdmin } from '../Middleware/authMiddleware.js';
import { getAllQuotes, updateQuoteStatus } from '../Controllers/quoteController.js';


const router = express.Router();

router.post('/register', registerUser);
router.get('/verify/:token', verifyAccount);
router.post('/login', loginUser);
router.post('/admin-login', loginAdmin);

// CLIENT ROUTE: Any logged-in user can view their profile
router.get('/profile', protect, (req, res) => {
    res.json(req.user);
});

// ADMIN ROUTES: Must pass BOTH 'protect' (logged in) AND 'isAdmin' (role === 'admin')
router.get('/all-quotes', protect, isAdmin, getAllQuotes);
router.patch('/update-quote/:id', protect, isAdmin, updateQuoteStatus);
router.get('/admin-dashboard', protect, isAdmin, getDashboardData);

export default router;