const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const rubberDucksRoutes = require('./routes/rubberDucks')
const videoRoutes = require('./routes/watch.js')

dotenv.config();

mongoose.connection.on('connected', () => {
  console.log('Connected DB name:', mongoose.connection.name);
});


// Constants
const PORT = process.env.PORT;

// Create Express server
const app = express();

// Middleware
app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Routes
app.use('/api/rubberDucks', rubberDucksRoutes)
app.use('/api/watch', videoRoutes)

app.get('/', (req, res)=> {
  res.json({mssg: 'welcom to MGB'})
})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to mongoDB & listening on myport', process.env.PORT)
    })
  }).catch((err) => {
    console.log(err)
  });




