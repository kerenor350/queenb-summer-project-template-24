// טענת משתני סביבה חייבת להיות ראשונה
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// require לראוטים
const videoRoutes = require('./routes/videos');
const albumRoutes = require('./routes/albums');

mongoose.connection.on('connected', () => {
  console.log('Connected DB name:', mongoose.connection.name);
});

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/videos', videoRoutes);
app.use('/api/albums', albumRoutes);

app.get('/', (req, res) => {
  res.json({ mssg: 'welcom to MGB' });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to mongoDB & listening on myport', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
