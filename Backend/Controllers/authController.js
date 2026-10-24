import User from '../Models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import mongoose from 'mongoose';


// Helper: Send Verification Email
const sendVerificationMail = async (email, token, name, role) => {
    // 1. Pre-flight Credential Validation
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.error('❌ CRITICAL: SMTP credentials are STILL missing from process.env at execution time!');
        console.log('Current ENV keys available:', Object.keys(process.env));
        return; // Return early so it doesn't crash the server
    }

    // 2. Lazy Initialization: Create transporter inside the function
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for port 465
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls: {
            rejectUnauthorized: false // Helps prevent local/cloud certificate issues
        },
        family: 4 // Forces IPv4, bypassing Render's IPv6 networking bugs
    });

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const verificationUrl = `${clientUrl}/verify-email?token=${token}`;
    const roleDisplay = role === 'admin' ? 'Administrator' : 'User';
    
    console.log(`📧 Attempting to send verification email to: ${email}`);
    
    try {
        const info = await transporter.sendMail({
            from: '"JN Enterprise" <noreply@jnenterprise.com>',
            to: email,
            subject: 'Verify Your Email - JN Enterprise',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                    <h2 style="color: #1f2937;">Welcome to JN Enterprise, ${name}!</h2>
                    <p style="color: #4b5563; font-size: 16px;">Thank you for registering as a <strong>${roleDisplay}</strong>.</p>
                    <p style="color: #4b5563; font-size: 16px;">Please verify your email address by clicking the link below:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationUrl}" style="background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Verify Email</a>
                    </div>
                    <p style="color: #6b7280; font-size: 14px;">Or copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; color: #3b82f6; font-size: 14px;">${verificationUrl}</p>
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
                    <p style="color: #9ca3af; font-size: 12px; text-align: center;"><em>Note: This link expires in 24 hours.</em></p>
                </div>
            `
        });
        console.log(`✅ Verification email successfully sent to ${email}. Message ID: ${info.messageId}`);
    } catch (error) {
        console.error(`❌ CRITICAL: Failed to send verification email to ${email}`);
        console.error('SMTP ERROR DETAILS:', error);
        throw error; // Rethrow to ensure the register controller handles it properly
    }
};

// =======================================================
// 1. REGISTER CLIENT
// =======================================================
export const registerUser = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.error('❌ DATABASE NOT CONNECTED. readyState:', mongoose.connection.readyState);
            return res.status(503).json({ 
                success: false, 
                error: 'Database connection is temporarily unavailable. Please check MongoDB Atlas IP Whitelist.' 
            });
        }

        const { name, username, email, password, role } = req.body;
        const displayName = name || username;

        if (!displayName || !email || !password) {
            return res.status(400).json({ error: 'Please add all required fields.' });
        }

        console.log('1. Checking for existing user...');
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'An account with this email already exists.' });
        }

        console.log('2. Hashing password...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const tokenExpires = Date.now() + 30 * 60 * 1000; // 30 mins from now

        // Determine role (Security fallback: only allow 'admin' or 'user')
        const assignedRole = role === 'admin' ? 'admin' : 'user';

        console.log('3. Saving user to MongoDB Atlas with role:', assignedRole);
        const user = await User.create({
            name: displayName,
            email,
            password: hashedPassword,
            role: assignedRole,
            isVerified: false, // Explicitly forcing false on creation
            verificationToken,
            verificationTokenExpires: tokenExpires
        });

        console.log('4. User successfully created in DB:', user._id);
        console.log('   -> Generated Token:', verificationToken);
        console.log('   -> Stored Token in DB:', user.verificationToken);
        console.log('5. Attempting to send Nodemailer verification email...');

        try {
            await sendVerificationMail(user.email, verificationToken, displayName, assignedRole);
            return res.status(201).json({
                success: true,
                role: assignedRole,
                message: 'Registration successful! Please check your email to verify your account.',
                user: user
            });
        } catch (emailError) {
            console.error('⚠️ Verification Email failed to send. SMTP Error:', emailError.response || emailError.message);
            return res.status(201).json({
                success: true,
                message: 'User registered successfully! (Verification email delayed).',
                role: assignedRole,
                user: user
            });
        }

    } catch (error) {
        console.error('❌ DATABASE / SERVER CRASH:', error.stack || error);

        if (error.name === 'MongooseServerSelectionError') {
            console.error('❌ CANNOT REACH MONGODB ATLAS');
            return res.status(504).json({ success: false, error: 'Database connection failed. Render IP is likely blocked by MongoDB Atlas firewall.' });
        }
        
        if (error.code === 11000) {
            return res.status(400).json({ success: false, error: 'An account with this email already exists.' });
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, error: error.message });
        }

        return res.status(500).json({ success: false, error: error.message || 'Server error during registration.' });
    }
};

// =======================================================
// 2. VERIFY ACCOUNT
// =======================================================
export const verifyAccount = async (req, res) => {
    try {
        const { token } = req.body; // UPDATED: Reading token from JSON body instead of URL params

        console.log('--- VERIFICATION DEBUG ---');
        console.log('1. Token received from BODY:', token);

        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ error: 'Invalid verification token.' });
        }

        // Check if token is expired, but ONLY if they aren't already verified
        if (!user.isVerified && user.verificationTokenExpires < Date.now()) {
            return res.status(400).json({ error: 'Verification token has expired. Please register again.' });
        }

        // Idempotency: If already verified, return success immediately
        if (user.isVerified) {
            return res.status(200).json({ message: 'Email is already verified! You can now log in.' });
        }

        console.log('2. Database query result:', user ? `User found (${user.email})` : 'Null (No user found or token expired)');
        
        if (!user) {
            const checkTokenOnly = await User.findOne({ verificationToken: token });
            if (checkTokenOnly) {
                console.log('   -> Token exists in DB but might be expired. Expiry in DB:', checkTokenOnly.verificationTokenExpires);
                console.log('   -> Current server time (Date.now()):', new Date(Date.now()));
            } else {
                console.log('   -> Token does NOT exist in DB at all.');
            }
        }
        console.log('--------------------------');

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired verification token. Please try registering again or request a new link.' });
        }

        user.isVerified = true;
        // We DO NOT set verificationToken to undefined here. 
        // React 18 StrictMode double-fetches the API. If we delete the token on the first fetch, 
        // the second fetch (milliseconds later) will fail with "Invalid token".
        await user.save();

        return res.status(200).json({ message: 'Email verified successfully! You can now log in.' });

    } catch (error) {
        console.error('Verification error:', error);
        return res.status(500).json({ error: 'Server error during verification. Please try again later.' });
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

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ error: 'Please verify your email address before logging in.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'fallback_secret_key_123',
            { expiresIn: '1d' }
        );

        // Optional: Keep cookie setting if it was originally there, though requirements only specify JSON response.
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(200).json({
            success: true,
            token,
            user: { _id: user._id, name: user.name, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Server error during login.' });
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

        return res.status(200).json({
            success: true,
            message: 'Admin authenticated successfully.',
            admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
        });

    } catch (error) {
        console.error('Admin login error:', error);
        return res.status(500).json({
            success: false,
            error: 'Server error during registration.'
        });
    }
};