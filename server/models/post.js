const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);
