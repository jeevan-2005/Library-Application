const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token: {type: String, required: true}
},{
    versionKey : false
})

const blacklistModel = mongoose.model('blacklistedToken', blacklistSchema);

module.exports = blacklistModel;