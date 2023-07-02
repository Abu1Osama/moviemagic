const mongoose = require('mongoose');

const serialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: [{
    type: String,
    required: true,
  }],
  director: {
    type: String,
    required: true,
  },
  cast: [{
    type: String,
    required: true,
  }],
  rating: {
    type: Number,
    required: true,
  },
  year_of_release: {
    type: Number,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  episodes: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Serial', serialSchema);
