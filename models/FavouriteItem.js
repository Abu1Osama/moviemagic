// models/FavoriteItems.js

const mongoose = require('mongoose');

const favoriteItemsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  }],
  serials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Serial',
  }],
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
  }],
});

module.exports = mongoose.model('FavoriteItems', favoriteItemsSchema);
