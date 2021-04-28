const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;