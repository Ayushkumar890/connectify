const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
require('dotenv').config();

exports.setposts = async (req, res) => {
    try {
        // console.log("User in setposts handler:", req.user); 
        const { title, description } = req.body;
        const userId = req.user._id;

        const newPost = new Post({
            name: userId,
            title,
            description
        });

        await newPost.save();
        // console.log("Post created successfully:", newPost);
        

        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.error("Error creating post:", error.message);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};



exports.getposts = async (req, res) => {
    try {
        const posts = await Post.find().populate('name', 'name role'); 
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};


exports.getUserPosts = async (req, res) => {
    try {
        const userId = req.user._id; 
        const posts = await Post.find({ name: userId }).populate('name', 'name'); 
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.error("Error fetching user posts:", error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user._id; 

        const post = await Post.findOne({ _id: postId, name: userId });

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found or you do not have permission to delete it.' });
        }

        // Delete the post
        await Post.deleteOne({ _id: postId });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

