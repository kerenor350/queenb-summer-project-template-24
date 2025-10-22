const express = require('express') // express package
const { upload } = require('../config/cloudinaryConfig');
const {
   createVideo,
   getAllVideos,
   getSingleVideo,
   deleteVideo,
   updateVideo
} = require('../controllers/videoController')
const router = express.Router()

// GET /api/watch  – כל הסרטונים
router.get('/', getAllVideos);

// GET /api/watch/:id – סרטון יחיד
const mongoose = require('mongoose');
router.get('/:id',getSingleVideo);

// POST a new video
router.post('/', upload.single('video'), createVideo); // שם השדה: 'video'


//delete a video
router.delete('/:id' ,deleteVideo)

//update a video
router.patch('/:id' ,updateVideo)
module.exports = router 