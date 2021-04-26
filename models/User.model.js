const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    log: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Session'
    }]
})

const User = mongoose.model('User', userSchema);
module.exports = User;