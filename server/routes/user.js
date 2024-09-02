const express = require('express');
const router = express.Router();
const { login, signup, sendotp, logout } = require('../controllers/auth');
const { auth, isStudent, isAdmin, verifyToken } = require('../middlewares/authMiddle');

// Public routes
router.post('/login', login);
router.post('/signup', signup);
router.post('/sendotp', sendotp);
router.get('/verify-token', verifyToken);
router.get('/logout', logout);


// Testing protected route
router.get('/test', auth, (req, res) => {
    res.json({
        success: true,
        message: "You are authenticated"
    });
});

// Protected profile route
router.get('/profile',auth, (req, res) => {
    console.log('User in profile route:', req.user);
    if (req.user ) {
        res.json({ user: req.user });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


// Protected routes
// router.get('/student', auth, isStudent, (req, res) => {
//     res.json({
//         success: true,
//         message: "You are a valid Student "
//     });
// });

// router.get('/admin', auth, isAdmin, (req, res) => {
//     res.json({
//         success: true,
//         message: "You are a valid Admin "
//     });
// });
module.exports = router;
