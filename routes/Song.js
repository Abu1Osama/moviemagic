const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const objectId = new ObjectId();

// Route for creating a new song
router.post("/", async (req, res) => {
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
// Route for updating a song
router.put("/:id", async (req, res) => {
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
    console.log(error)
  }
});

// Route for getting all songs with pagination and sorting
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const sort = req.query.sort || "-releaseYear"; // Default sort by release year in descending order

    const totalSongs = await Song.countDocuments(); // Count total number of songs in the collection
    const totalPages = Math.ceil(totalSongs / limit);

    const songs = await Song.find()
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.json({ songs, totalPages });
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