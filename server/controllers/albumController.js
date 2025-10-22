const mongoose = require('mongoose');
const Album = require('../models/Album');

exports.createAlbum = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Album name is required' });
    const album = await Album.create({ name });
    res.status(201).json(album);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getAlbums = async (_req, res) => {
  try {
    const albums = await Album.find().sort({ createdAt: -1 });
    res.json(albums);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getAlbumById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
  const album = await Album.findById(id);
  if (!album) return res.status(404).json({ error: 'Album not found' });
  res.json(album);
};
