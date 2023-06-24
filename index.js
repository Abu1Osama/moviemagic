// app.js
const express = require('express');
const app = express();
const connectDB = require('./controllers/db');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const favoriteRoutes = require('./routes/favorites');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
connectDB();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/favorites', favoriteRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
