const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const User = require('../models/User');
const Movie = require('../models/Movie');
const Serial = require('../models/Serial');
const Song = require('../models/Song');
const FavoriteItems = require('../models/FavouriteItem');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Common route for adding and removing items to/from favorites
router.post('/:itemType', authMiddleware.verifyUserToken, async (req, res) => {
  try {
    const { itemType } = req.params;
    const { itemId } = req.body;

    if (!['movies', 'serials', 'songs'].includes(itemType)) {
      return res.status(400).json({ error: 'Invalid item type.' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    let favoriteItems = await FavoriteItems.findOne({ user: user._id });
    if (!favoriteItems) {
      favoriteItems = new FavoriteItems({ user: user._id });
    }

    let item;
    if (itemType === 'movies') {
      item = await Movie.findById(itemId);
    } else if (itemType === 'serials') {
      item = await Serial.findById(itemId);
    } else if (itemType === 'songs') {
      item = await Song.findById(itemId);
    }

    if (!item) {
      return res.status(404).json({ error: `Item not found with ID: ${itemId}.` });
    }

    const itemArray = favoriteItems[itemType];
    if (!itemArray.includes(itemId)) {
      itemArray.push(itemId);
    }

    await favoriteItems.save();
    user.favorites.push(favoriteItems._id);
    await user.save();

    res.json({ message: `${itemType.slice(0, -1).toUpperCase()} added to favorites successfully.` });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the item to favorites.' });
    console.log(error)
  }
});

// Common route for removing items from favorites
router.delete('/:itemType/:itemId', authMiddleware.verifyUserToken, async (req, res) => {
  try {
    const { itemType, itemId } = req.params;

    if (!['movies', 'serials', 'songs'].includes(itemType)) {
      return res.status(400).json({ error: 'Invalid item type.' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    let favoriteItems = await FavoriteItems.findOne({ user: user._id });
    if (!favoriteItems) {
      return res.status(404).json({ error: 'Favorite items not found.' });
    }

    const itemArray = favoriteItems[itemType];
    if (!itemArray.includes(itemId)) {
      return res.status(404).json({ error: `Item not found in favorites with ID: ${itemId}.` });
    }

    favoriteItems[itemType] = itemArray.filter((id) => id !== itemId);
    await favoriteItems.save();

    res.json({ message: `${itemType.slice(0, -1).toUpperCase()} removed from favorites successfully.` });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while removing the item from favorites.' });
  }
});

// Route for getting favorite items
router.get('/', authMiddleware.verifyUserToken, async (req, res) => {
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
