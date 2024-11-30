const express = require('express');
const userCtrl = require('../controllers/userCtrl'); // Ensure this path is correct
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const router = express.Router();

// POST route for user registration
router.post('/register', userCtrl.register);

// POST route for user login
router.post('/login', userCtrl.login);

// POST route for refreshing tokens
router.post('/refresh_token', userCtrl.refreshtoken);

// GET route for logging out
router.get('/logout', userCtrl.logout);

// GET route for fetching user info (authentication required)
router.get('/infor', auth, userCtrl.getUser);

module.exports = router;
