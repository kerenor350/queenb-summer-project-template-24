const mongoose = require('mongoose');// a package to create modules and schemas

const Schema = mongoose.Schema;

const videoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    /*color: {
        type: String,
        required: true
    },*/
    videoUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true// to follow times of changes or updates
});

module.exports = mongoose.model('Video', videoSchema);