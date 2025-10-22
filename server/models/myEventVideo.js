const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  name:     { type: String, required: true },
  videoUrl: { type: String, required: true },
  album:    { type: Schema.Types.ObjectId, ref: 'Album', required: true }, // חדש
  category: { type: String, enum: ['family','friends','other'], default: 'other' } // חדש
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
