const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userCtrl = {
    // Register User
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Check if user already exists
            const user = await Users.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "Email is already registered" });
            }

            // Password validation (length check)
            if (password.length < 6) {
                return res.status(400).json({ msg: "Password must be at least 6 characters long" });
            }

            // Hashing the password
            const passwordHash = await bcrypt.hash(password, 10);

            // Creating new user with hashed password
            const newUser = new Users({
                name,
                email,
                password: passwordHash,
            });

            // Save the user in the database
            await newUser.save();

            // Create JWT tokens
            const accessToken = createAccessToken({ id: newUser._id });
            const refreshToken = createRefreshToken({ id: newUser._id });

            // Set refresh token in cookies
            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
                secure: true, // Use secure cookies in production
                sameSite: 'Strict',
            });

            // Send success response
            res.status(201).json({
                msg: "User registered successfully!",
                accessToken,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: err.message });
        }
    },

    // Login User
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: "User does not exist" });
            }

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Incorrect password" });
            }

            // Generate tokens
            const accessToken = createAccessToken({ id: user._id });
            const refreshToken = createRefreshToken({ id: user._id });

            // Set refresh token in cookies
            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
                secure: true, // Use secure cookies in production
                sameSite: 'Strict',
            });

            // Send success response
            res.json({
                msg: "Login successful",
                accessToken,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: err.message });
        }
    },

    // Refresh Token
    refreshtoken: async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshtoken;
            if (!refreshToken) {
                return res.status(400).json({ msg: "No refresh token provided" });
            }

            // Verify refresh token
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json({ msg: "Invalid refresh token" });
                }

                // Generate new access token
                const newAccessToken = createAccessToken({ id: user.id });
                res.json({ accessToken: newAccessToken });
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: err.message });
        }
    },

    // Logout User
    logout: async (req, res) => {
        try {
            // Clear the refresh token cookie
            res.clearCookie('refreshtoken', {
                httpOnly: true,
                path: '/user/refresh_token',
                secure: true, // Secure cookies for production
                sameSite: 'Strict',
            });

            res.json({ msg: "Logged out successfully" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: err.message });
        }
    },

    // Get User Info (for authenticated users)
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id);
            if (!user) return res.status(400).json({ msg: "User not found" });

            res.json({ name: user.name, email: user.email });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: err.message });
        }
    },
};

// Helper functions to create access and refresh tokens
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = userCtrl;
