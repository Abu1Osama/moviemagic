const express = require("express");
const router = express.Router();
const Song = require("../models/Song");

// Route for creating a new song
router.post("/", async (req, res) => {
  try {
    const { title, artist, duration, releaseYear, video_id, Singer } = req.body;

    // Check if the video ID already exists
    const existingSong = await Song.findOne({ video_id });
    if (existingSong) {
      return res.status(400).json({ error: "Video ID already exists." });
    }

    const song = new Song({
      title,
      artist,
      duration,
      releaseYear,
      video_id,
      Singer,
    });

    await song.save();

    res.status(201).json({ message: "Song created successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the song." });
  }
});

// Route for getting all songs with pagination and sorting
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const sort = req.query.sort || "-releaseYear"; // Default sort by release year in descending order

    const songs = await Song.find()
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.json({ songs });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving the songs." });
  }
});

// Route for filtering songs by singer
router.get("/singer", async (req, res) => {
  try {
    const { singer } = req.query;

    const songs = await Song.find({ Singer: singer });

    res.json({ songs });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while filtering the songs." });
  }
});

module.exports = router;
