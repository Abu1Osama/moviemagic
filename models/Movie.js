const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movie_name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
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
  },
});

module.exports = mongoose.model('Movie', movieSchema);
