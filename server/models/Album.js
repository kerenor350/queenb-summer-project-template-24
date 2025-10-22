// models/Album.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  name: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Album', albumSchema);
