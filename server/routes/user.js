const express = require('express');
const router = express.Router();
const { login, signup, sendotp, logout } = require('../controllers/auth');
const { auth, verifyToken } = require('../middlewares/authMiddle');
const {Post} = require('../models/post');
const { setposts, getposts, getUserPosts, deletePost } = require('../controllers/post');

// Public routes
router.post('/login', login);
router.post('/signup', signup);
router.post('/sendotp', sendotp);
router.get('/verify-token', verifyToken);
router.get('/logout', logout);
router.get('/posts', getposts);
router.post('/posts',auth, setposts);
router.get('/myposts',auth, getUserPosts);
router.delete('/posts/:postId', auth, deletePost);

// Testing protected route
router.get('/test', auth, (req, res) => {
    res.json({
        success: true,
        message: "You are authenticated"
    });
});

// Protected profile route
router.get('/profile',auth, (req, res) => {
    // console.log('User in profile route:', req.user);
    if (req.user ) {
        res.json({ user: req.user });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
