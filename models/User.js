const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteMovies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
    },
  ],
  favoriteSerials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Serial',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
