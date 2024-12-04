const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Ensure email is unique
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Visitor', 'Mental', 'Yoga', 'Sports','Fitness'],
        default: 'Visitor', // Set a default role
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);
