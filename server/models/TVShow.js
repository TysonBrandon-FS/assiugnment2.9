const mongoose = require('mongoose');

const tvShowSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TVShow', tvShowSchema); 