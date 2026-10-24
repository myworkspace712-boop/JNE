import express from 'express';
import { registerUser, verifyAccount, loginUser, loginAdmin } from '../Controllers/authController.js';
import { protect } from '../Middleware/authMiddleware.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/verify', verifyAccount); // UPDATED: Changed from GET to POST for JSON body token
router.post('/login', loginUser);
router.post('/admin-login', loginAdmin);

// CLIENT ROUTE: Any logged-in user can view their profile
router.get('/profile', protect, (req, res) => {
    res.json(req.user);
});

export default router;