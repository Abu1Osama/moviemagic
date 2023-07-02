const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const Movie = require("../models/Movie");

router.post("/", async (req, res) => {
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
    res
      .status(500)
      .json({ error: "An error occurred while creating the movie." });
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();

    res.json({ movies });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the movies." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }

    res.json({ movie });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the movie." });
  }
});

router.put("/:id", async (req, res) => {
  try {

    const { id } = req.params;
    const updatedMovieData = req.body;
   

    const movie = await Movie.findByIdAndUpdate(id,updatedMovieData
   
    );

    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }

    res.json({ message: "Movie updated successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the movie." });
  }
});

router.delete("/:id",  async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }

    res.json({ message: "Movie deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the movie." });
  }
});

module.exports = router;
