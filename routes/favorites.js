const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const User = require('../models/User');
const Movie = require('../models/Movie');
const Serial = require('../models/Serial');
const Song = require('../models/Song');
const FavoriteItems = require('../models/FavoriteItems');

// Add movie to favorites
router.post('/movies', authMiddleware.verifyUserToken, async (req, res) => {
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

    let favoriteItems = await FavoriteItems.findOne({ user: user._id });

    if (!favoriteItems) {
      favoriteItems = new FavoriteItems({ user: user._id });
    }

    if (!favoriteItems.movies.includes(movieId)) {
      favoriteItems.movies.push(movieId);
    }

    await favoriteItems.save();
    user.favorites.push(favoriteItems._id);
    await user.save();

    res.json({ message: 'Movie added to favorites successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the movie to favorites.' });
  }
});

// Remove movie from favorites
router.delete('/movies/:movieId', authMiddleware.verifyUserToken, async (req, res) => {
  try {
    const { movieId } = req.params;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    let favoriteItems = await FavoriteItems.findOne({ user: user._id });

    if (!favoriteItems) {
      return res.status(404).json({ error: 'Favorite items not found.' });
    }

    if (!favoriteItems.movies.includes(movieId)) {
      return res.status(404).json({ error: 'Movie not found in favorites.' });
    }

    favoriteItems.movies = favoriteItems.movies.filter((id) => id !== movieId);
    await favoriteItems.save();

    res.json({ message: 'Movie removed from favorites successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while removing the movie from favorites.' });
  }
});

// Add TV serial to favorites
router.post('/serials', authMiddleware.verifyUserToken, async (req, res) => {
  try {
    const { serialId } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const serial = await Serial.findById(serialId);
    if (!serial) {
      return res.status(404).json({ error: 'TV serial not found.' });
    }

    let favoriteItems = await FavoriteItems.findOne({ user: user._id });

    if (!favoriteItems) {
      favoriteItems = new FavoriteItems({ user: user._id });
    }

    if (!favoriteItems.serials.includes(serialId)) {
      favoriteItems.serials.push(serialId);
    }

    await favoriteItems.save();
    user.favorites.push(favoriteItems._id);
    await user.save();

    res.json({ message: 'TV serial added to favorites successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the TV serial to favorites.' });
  }
});

// Remove TV serial from favorites
router.delete('/serials/:serialId', authMiddleware.verifyUserToken, async (req, res) => {
  try {
    const { serialId } = req.params;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    let favoriteItems = await FavoriteItems.findOne({ user: user._id });

    if (!favoriteItems) {
      return res.status(404).json({ error: 'Favorite items not found.' });
    }

    if (!favoriteItems.serials.includes(serialId)) {
      return res.status(404).json({ error: 'TV serial not found in favorites.' });
    }

    favoriteItems.serials = favoriteItems.serials.filter((id) => id !== serialId);
    await favoriteItems.save();

    res.json({ message: 'TV serial removed from favorites successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while removing the TV serial from favorites.' });
  }
});

// Add song to favorites
router.post('/songs', authMiddleware.verifyUserToken, async (req, res) => {
  try {
    const { songId } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ error: 'Song not found.' });
    }

    let favoriteItems = await FavoriteItems.findOne({ user: user._id });

    if (!favoriteItems) {
      favoriteItems = new FavoriteItems({ user: user._id });
    }

    if (!favoriteItems.songs.includes(songId)) {
      favoriteItems.songs.push(songId);
    }

    await favoriteItems.save();
    user.favorites.push(favoriteItems._id);
    await user.save();

    res.json({ message: 'Song added to favorites successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the song to favorites.' });
  }
});

// Remove song from favorites
router.delete('/songs/:songId', authMiddleware.verifyUserToken, async (req, res) => {
  try {
    const { songId } = req.params;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    let favoriteItems = await FavoriteItems.findOne({ user: user._id });

    if (!favoriteItems) {
      return res.status(404).json({ error: 'Favorite items not found.' });
    }

    if (!favoriteItems.songs.includes(songId)) {
      return res.status(404).json({ error: 'Song not found in favorites.' });
    }

    favoriteItems.songs = favoriteItems.songs.filter((id) => id !== songId);
    await favoriteItems.save();

    res.json({ message: 'Song removed from favorites successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while removing the song from favorites.' });
  }
});
router.get('/favorites', authMiddleware.verifyUserToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const favoriteItems = await FavoriteItems.findOne({ user: user._id }).populate('movies serials songs');

    if (!favoriteItems) {
      return res.status(404).json({ error: 'Favorite items not found.' });
    }

    res.json({ favoriteItems });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving favorite items.' });
  }
});

module.exports = router;
