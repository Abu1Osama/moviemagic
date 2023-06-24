const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Movie = require('../models/Movie');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/posters');
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage });

router.post('/', authMiddleware.verifyToken, upload.single('poster'), async (req, res) => {
  try {
    const { movie_name, genre, director, rating, year_of_release } = req.body;

    const movie = new Movie({
      movie_name,
      genre,
      director,
      rating,
      year_of_release,
      poster: req.file?.filename,
    });

    await movie.save();

    res.status(201).json({ message: 'Movie created successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the movie.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();

    res.json({ movies });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the movies.' });
  }
});

router.get('/:id', authMiddleware.verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found.' });
    }

    res.json({ movie });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the movie.' });
  }
});

router.patch('/:id', authMiddleware.verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { movie_name, genre, director, rating, year_of_release } = req.body;

    const movie = await Movie.findByIdAndUpdate(
      id,
      { movie_name, genre, director, rating, year_of_release },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found.' });
    }

    res.json({ message: 'Movie updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the movie.' });
  }
});

router.delete('/:id', authMiddleware.verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found.' });
    }

    res.json({ message: 'Movie deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the movie.' });
  }
});

module.exports = router;
