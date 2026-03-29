const mongoose = require('mongoose');

const blackListedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
}, { timestamps: true });

const BlackListedToken = mongoose.model('blackListedToken', blackListedTokenSchema);

module.exports = BlackListedToken;