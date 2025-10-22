const mongoose = require('mongoose');
const Video = require('../models/myEventVideo');
const Album = require('../models/Album'); 

// GET /api/videos – כל הסרטונים (עם סינון לפי אלבום)
const getAllVideos = async (req, res) => {
  try {
    const { album } = req.query;
    const filter = {};

    if (album) {
      if (!mongoose.isValidObjectId(album)) {
        return res.status(400).json({ error: 'Invalid album id' });
      }
      filter.album = album;
    }

    const videos = await Video.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(videos);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch videos' });
  }
};


// GET /api/videos/:id – סרטון יחיד
const getSingleVideo = async (req, res) => {
  const { id } = req.params;

  // פורמט מזהה לא תקין
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    return res.status(200).json(video);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch video' });
  }
};

// POST /api/videos – יצירת סרטון (קובץ או URL) עם שיוך לאלבום וקטגוריה
const createVideo = async (req, res) => {
  try {
    const { name, videoUrl, album, category } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'name is required' });
    }

    // וידוא אלבום
    if (!album || !mongoose.isValidObjectId(album)) {
      return res.status(400).json({ error: 'valid album is required' });
    }
    const albumDoc = await Album.findById(album);
    if (!albumDoc) {
      return res.status(404).json({ error: 'Album not found' });
    }

    // אם הועלה קובץ דרך Cloudinary נקבל path
    let finalUrl = videoUrl;
    if (req.file && req.file.path) {
      finalUrl = req.file.path;
    }
    if (!finalUrl) {
      return res.status(400).json({ error: 'Provide a video file or a videoUrl' });
    }

    const video = await Video.create({
      name,
      videoUrl: finalUrl,
      album, // ← חדש
      category: ['family', 'friends', 'other'].includes(category) ? category : 'other', // ← חדש
    });

    return res.status(201).json(video);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



// DELETE /api/videos/:id – מחיקה
const deleteVideo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  try {
    const video = await Video.findByIdAndDelete(id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete video' });
  }
};

// PATCH /api/videos/:id – עדכון
const updateVideo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  try {
    const video = await Video.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    return res.status(200).json(video);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update video' });
  }
};

module.exports = { getAllVideos, getSingleVideo, createVideo, deleteVideo, updateVideo };
