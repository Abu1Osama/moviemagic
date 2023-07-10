const express = require("express");
const router = express.Router();
const Music = require("../models/Music");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const authMiddleware = require("../middlewares/auth");

const objectId = new ObjectId();

// Route for creating a new music
router.post("/", authMiddleware.verifyAdminToken, async (req, res) => {
  try {
    const { title,  duration, releaseYear, video_id, Singer, Poster } = req.body;

    // Check if the video ID already exists
    const existingMusic = await Music.findOne({ video_id });
    if (existingMusic) {
      return res.status(400).json({ error: "Video ID already exists." });
    }

    const music = new Music({
      title,
      duration,
      releaseYear,
      video_id,
      Singer,
      Poster,
    });

    await music.save();

    res.status(201).json({ message: "music created successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the music." });
    console.log(error)
  }
});

router.put("/:id", authMiddleware.verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMusicData = req.body;

    const music = await Music.findByIdAndUpdate(id, updatedMusicData);

    if (!music) {
      return res.status(404).json({ error: "music not found." });
    }

    res.status(200).json({ message: "music updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the music." });
  }
});

router.get("/", async (req, res) => {
  try {
    const sort = req.query.sort || "-releaseYear"; // Default sort by release year in descending order

    const musics = await Music.find().sort(sort);

    res.json({ musics });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving the music." });
  }
});

router.get("/singer", async (req, res) => {
  try {
    const { singer } = req.query;

    const musics = await Music.find({ Singer: singer });

    res.json({ musics });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while filtering the music." });
  }
});

router.delete("/:id", authMiddleware.verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;

    const music = await Music.findByIdAndDelete(id);

    if (!music) {
      return res.status(404).json({ error: "music not found." });
    }

    res.status(200).json({ message: "music deleted successfully." });
  } catch (error) {
      console.log(error)
    res.status(500).json({ error: "An error occurred while deleting the music." });
  }
});

module.exports = router;
