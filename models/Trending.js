const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  video_id: String,
  trailer_id: String,
  name: String,
  genre: [String],
  director: String,
  cast: [String],
  rating: String,
  year_of_release: String,
  poster: String,
  details: String,
  duration: String
});

module.exports = mongoose.model('Trending', movieSchema);
