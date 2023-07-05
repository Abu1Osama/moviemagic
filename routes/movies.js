const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const Movie = require("../models/Movie");
const mongoose = require("mongoose");

// Create a new movie (admin only)
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

    const movie = new Movie({
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

    await movie.save();

    res.status(201).json({ message: "Movie created successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the movie." });
  }
});

// Get all movies
router.get("/", async (req, res) => {
  const sort = req.query.sort || "-year_of_release";

  try {
    const movies = await Movie.find().sort(sort);

    res.json({ movies });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving the movies." });
  }
});

// Get a specific movie by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }

    res.json({ movie });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving the movie." });
  }
});

// Update a movie (admin only)
router.put("/:id", authMiddleware.verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovieData = req.body;

    const movie = await Movie.findByIdAndUpdate(id, updatedMovieData);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }

    res.json({ message: "Movie updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the movie." });
  }
});

// Delete a movie (admin only)
router.delete("/:id", authMiddleware.verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }

    res.json({ message: "Movie deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the movie." });
  }
});

module.exports = router;
