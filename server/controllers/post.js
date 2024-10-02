const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.setposts = async (req, res) => {
    try {
        console.log("User in setposts handler:", req.user); // Debug log
        const { title, description } = req.body;
        const userId = req.user._id;

        // Creating post without a custom id field
        const newPost = new Post({
            name: userId,
            title,
            description
        });

        await newPost.save();
        console.log("Post created successfully:", newPost);
        

        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.error("Error creating post:", error.message);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};



exports.getposts = async (req, res) => {
    try {
        const posts = await Post.find().populate('name', 'name'); // Optional: populate user details if needed
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
