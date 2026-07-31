import User from '../Models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';


// Transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Required for port 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },

    family: 4,

    connectionTimeout: 20000, // 20 seconds
    greetingTimeout: 20000,   // 20 seconds
    socketTimeout: 20000,     // 20 seconds

    tls: {
        rejectUnauthorized: false
    },
});


// Helper: Send Verification Email
const sendVerificationMail = async (email, token) => {
    const verificationUrl = `http://localhost:5173/verify/${token}`;
    await transporter.sendMail({
        from: '"JN Enterprise" <noreply@jnenterprise.com>',
        to: email,
        subject: 'Verify Your Email - JN Enterprise',
        html: `
            <h2>Welcome to JN Enterprise!</h2>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="${verificationUrl}" style="background-color: #f59e0b; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
            <p>Or copy and paste this link: ${verificationUrl}</p>
            <p><em>Note: This link expires in 24 hours.</em></p>
        `
    });
};

// =======================================================
// 1. REGISTER CLIENT
// =======================================================
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Please add all required fields.' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'An account with this email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const tokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'client', // Default role set explicitly
            isVerified: false,
            verificationToken,
            verificationTokenExpires: tokenExpires
        });

        try {
            await sendVerificationMail(user.email, verificationToken);
        } catch (emailError) {
            console.error("Failed to send verification email:", emailError);
            // If email fails, remove user so they can attempt registration again
            await User.findByIdAndDelete(user._id);
            return res.status(500).json({ error: 'Email service error. Please try registering again later.' });
        }

        res.status(201).json({
            success: true,
            message: 'Registration successful! Please check your email to verify your account.'
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error during registration.' });
    }
};

// =======================================================
// 2. VERIFY EMAIL
// =======================================================
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: Date.now() } // Ensure token is not expired
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired verification token.' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Email successfully verified. You can now log in.' });

    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ error: 'Server error during verification.' });
    }
};

// =======================================================
// 3. CLIENT LOGIN
// =======================================================
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password.' });
        }

        const user = await User.findOne({ email, role: 'client' });
        if (!user) {
            return res.status(400).json({ error: 'Invalid client credentials.' });
        }

        if (!user.isVerified) {
            return res.status(401).json({ error: 'Please verify your email address before logging in.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid client credentials.' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'fallback_secret_key_123',
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: 'Client logged in successfully.',
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error('Client login error:', error);
        res.status(500).json({ error: 'Server error during login.' });
    }
};

// =======================================================
// 4. ADMIN LOGIN (Strict Role Check)
// =======================================================
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password.' });
        }

        const admin = await User.findOne({ email, role: 'admin' });
        if (!admin) {
            return res.status(403).json({ error: 'Access denied. Invalid admin credentials.' });
        }

        if (!admin.isVerified) {
            return res.status(401).json({ error: 'Admin email address is unverified.' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid admin credentials.' });
        }

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET || 'fallback_secret_key_123',
            { expiresIn: '1d' } // Shorter expiration for admin security
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 1 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: 'Admin authenticated successfully.',
            admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Server error during admin login.' });
    }
};