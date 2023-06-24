const express = require('express');
const router = express.Router();
const Serial = require('../models/Serial');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware.verifyToken,  async (req, res) => {
  try {
    const { name, genre, director, cast, rating, year_of_release, poster, details, episodes } = req.body;

    const serial = new Serial({
      name,
      genre,
      director,
      cast,
      rating,
      year_of_release,
      poster,
      details,
      episodes,
    });

    await serial.save();

    res.status(201).json({ message: 'Serial created successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the serial.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const serials = await Serial.find();

    res.json({ serials });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the serials.' });
  }
});

router.get('/:id',authMiddleware.verifyToken,  async (req, res) => {
  try {
    const { id } = req.params;

    const serial = await Serial.findById(id);

    if (!serial) {
      return res.status(404).json({ error: 'Serial not found.' });
    }

    res.json({ serial });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the serial.' });
  }
});

router.patch('/:id', authMiddleware.verifyToken,  async (req, res) => {
  try {
    const { id } = req.params;
    const { name, genre, director, cast, rating, year_of_release, poster, details, episodes } = req.body;

    const serial = await Serial.findByIdAndUpdate(
      id,
      { name, genre, director, cast, rating, year_of_release, poster, details, episodes },
      { new: true }
    );

    if (!serial) {
      return res.status(404).json({ error: 'Serial not found.' });
    }

    res.json({ message: 'Serial updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the serial.' });
  }
});

router.delete('/:id',authMiddleware.verifyToken,  async (req, res) => {
  try {
    const { id } = req.params;

    const serial = await Serial.findByIdAndDelete(id);
    if (!serial) {
      return res.status(404).json({ error: 'Serial not found.' });
    }

    res.json({ message: 'Serial deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the serial.' });
  }
});

module.exports = router;
