const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const Trending = require("../models/Trending");
const mongoose = require("mongoose");

// Create a new trending movie (admin only)
router.post("/", authMiddleware.verifyAdminToken, async (req, res) => {
  try {
    const {
      video_id,
      trailer_id,
      name,
      genre,
      director,
      cast,
      rating,
      year_of_release,
      poster,
      details,
      duration,
    } = req.body;

    const trendingMovie = new Trending({
      video_id,
      trailer_id,
      name,
      genre,
      director,
      cast,
      rating,
      year_of_release,
      poster,
      details,
      duration,
    });

    await trendingMovie.save();

    res.status(201).json({ message: "Trending movie created successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the trending movie." });
  }
});

// Get all trending movies
router.get("/", async (req, res) => {
  const sort = req.query.sort || "-year_of_release";

  try {
    const trendingMovies = await Trending.find().sort(sort);

    res.json({ trendingMovies });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the trending movies." });
  }
});

// Get a specific trending movie by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const trendingMovie = await Trending.findById(id);

    if (!trendingMovie) {
      return res.status(404).json({ error: "Trending movie not found." });
    }

    res.json({ trendingMovie });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the trending movie." });
  }
});

// Update a trending movie (admin only)
router.put("/:id", authMiddleware.verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTrendingMovieData = req.body;

    const trendingMovie = await Trending.findByIdAndUpdate(
      id,
      updatedTrendingMovieData
    );

    if (!trendingMovie) {
      return res.status(404).json({ error: "Trending movie not found." });
    }

    res.json({ message: "Trending movie updated successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the trending movie." });
  }
});

// Delete a trending movie (admin only)
router.delete("/:id", authMiddleware.verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;

    const trendingMovie = await Trending.findByIdAndDelete(id);
    if (!trendingMovie) {
      return res.status(404).json({ error: "Trending movie not found." });
    }

    res.json({ message: "Trending movie deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the trending movie." });
  }
});

module.exports = router;
