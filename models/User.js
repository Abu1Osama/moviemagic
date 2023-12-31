// user.js (User Model)
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
  image: String, // File path or URL for the user's image
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FavoriteItems' }],
});

module.exports = mongoose.model('User', userSchema);

