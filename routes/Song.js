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
      res
        .status(500)
        .json({ error: "An error occurred while creating the song." });
    }
  });
  
// Route for getting all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();

    res.json({ songs });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the songs." });
  }
});

module.exports = router;
