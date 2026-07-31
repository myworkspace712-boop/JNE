import jwt from 'jsonwebtoken';
import User from '../Models/user.js';


// 1. General Authentication Middleware (Verifies user is logged in & verified)
export const protect = async (req, res, next) => {
    let token;

    // Check cookies first, then Authorization header
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authorized. No token provided.' });
    }

    try {
        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'fallback_secret_key_123'
        );

        // Fetch user (excluding password)
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({ error: 'User associated with this token no longer exists.' });
        }

        // Safety check: Ensure account is still verified
        if (!req.user.isVerified) {
            return res.status(403).json({ error: 'Access denied. Account is not verified.' });
        }

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ error: 'Not authorized. Invalid or expired token.' });
    }
};

// 2. Role-Based Authorization Guard (Restricts routes strictly to Admins)
export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }
};

// Example: Your existing middleware that verifies the user is logged in
export const requireAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Or req.cookies.token

        if (!token) {
            return res.status(401).json({ error: 'No token provided, authorization denied.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // This line is the magic key! It attaches the database user to req.user:
        req.user = await User.findById(decoded.id || decoded.userId).select('-password');

        next(); // Moves on to the next middleware or route controller
    } catch (error) {
        return res.status(401).json({ error: 'Token is invalid or expired.' });
    }
};

// ADD THIS ADMIN MIDDLEWARE RIGHT BELOW IT:
export const requireAdmin = (req, res, next) => {
    // Check if req.user exists AND if their role is 'admin'
    if (req.user && req.user.role === 'admin') {
        next(); // They are an admin! Let them pass to the controller.
    } else {
        res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }
};