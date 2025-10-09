const express = require('express') // express package

const router = express.Router()

//this is to watch all videos
router.get('/', (req, res) => {
    res.json({mssg: 'Watch all videos'})
})

//Watch a single video
router.get('/:id', (req, res)=> {
    res.json({mssg: 'watch a video'})
})

// POST a new video
router.post('/' ,(req, res) => {
   res.json({mssg: 'post a new video '}) 
})

//delete a video
router.delete('/:id' ,(req, res) => {
   res.json({mssg: 'delete a video'}) 
})

//update a video
router.patch('/:id' ,(req, res) => {
   res.json({mssg: 'update a video '}) 
})
module.exports = router //what is exports?