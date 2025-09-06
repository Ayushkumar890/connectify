const express = require('express');
const router = express.Router();
const { login, signup, sendotp, logout, getUserById } = require('../controllers/auth');
const { auth, verifyToken } = require('../middlewares/authMiddle');
const { Post } = require('../models/post');
const { setposts, getposts, getUserPosts, deletePost } = require('../controllers/post');

// Public routes
router.post(`/user`, getUserById);
router.post('/login', login);
router.post('/signup', signup);
router.post('/sendotp', sendotp);
router.get('/verify-token', verifyToken);
router.get('/logout', logout);
router.get('/posts', getposts);
router.post('/posts', auth, setposts);
router.get('/myposts', auth, getUserPosts);
router.delete('/posts/:postId', auth, deletePost);


const User = require('../models/user'); 

// Search endpoint
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Query parameter is required' });
        }

        const users = await User.find({
            $or: [
                { name: { $regex: `^${query}`, $options: 'i' } }, // Matches names starting with the query
                { email: { $regex: `^${query}`, $options: 'i' } }, // Matches emails starting with the query
            ],
        }).select('name email image _id');

        if (!users.length) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.json(users); 

    } catch (error) {
        console.error('Error searching users:', error.message);
        res.status(500).json({ message: 'Error searching users', error: error.message });
    }
});


// Testing protected route
router.get('/test', auth, (req, res) => {
    res.json({
        success: true,
        message: "You are authenticated"
    });
});

// Protected profile route
router.get('/profile', auth, (req, res) => {
    // console.log('User in profile route:', req.user);
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
