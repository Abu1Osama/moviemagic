const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const authMiddleware = require("../middlewares/auth");

const objectId = new ObjectId();

// Route for creating a new song
router.post("/", authMiddleware.verifyAdminToken, async (req, res) => {
  try {
    const { title, artist, duration, releaseYear, video_id, Singer, Poster } = req.body;

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
      Poster
    });

    await song.save();

    res.status(201).json({ message: "Song created successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the song." });
  }
});

// Route for updating a song
router.put("/:id", authMiddleware.verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSongData = req.body;

    const song = await Song.findByIdAndUpdate(id, updatedSongData);

    if (!song) {
      return res.status(404).json({ error: "Song not found." });
    }

    res.status(200).json({ message: "Song updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the song." });
  }
});

// Route for getting all songs with pagination and sorting
router.get("/", async (req, res) => {
  try {
    const sort = req.query.sort || "-releaseYear"; // Default sort by release year in descending order

    const songs = await Song.find().sort(sort);

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

// Route for deleting a song
router.delete("/:id", authMiddleware.verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;

    const song = await Song.findByIdAndDelete(id);

    if (!song) {
      return res.status(404).json({ error: "Song not found." });
    }

    res.status(200).json({ message: "Song deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the song." });
  }
});

module.exports = router;
