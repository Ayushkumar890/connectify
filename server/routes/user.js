const express = require('express');
const router = express.Router();

const { login, signup, sendotp } = require('../controllers/auth');
const { auth, isStudent, isAdmin } = require('../middlewares/authMiddle');

// Public routes
router.post('/login', login);
router.post('/signup', signup);
router.post('/sendotp', sendotp);

// Testing protected route
router.get('/test', auth, (req, res) => {
    res.json({
        success: true,
        message: "You are a valid Tester "
    });
});

// Protected routes
router.get('/student', auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "You are a valid Student "
    });
});

router.get('/admin', auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "You are a valid Admin "
    });
});

module.exports = router;
