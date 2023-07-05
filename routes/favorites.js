const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const User = require('../models/User');
const Movie = require('../models/Movie');

router.post('/', authMiddleware.verifyUserToken, async (req, res) => {
  try {
    const { movieId } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found.' });
    }

    user.favorites.push(movieId);
    await user.save();

    res.json({ message: 'Movie added to favorites successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the movie to favorites.' });
  }
});

router.get('/', authMiddleware.verifyUserToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('favorites', '-__v');

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the favorites.' });
  }
});

module.exports = router;
