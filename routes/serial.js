const express = require("express");
const router = express.Router();
const Serial = require("../models/Serial");
const authMiddleware = require("../middlewares/auth");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const objectId = new ObjectId();

// Create a new serial (accessible only to admins)
router.post("/", authMiddleware.verifyAdminToken, async (req, res) => {
  try {
    const {
      title,
      genre,
      director,
      cast,
      rating,
      year_of_release,
      poster,
      details,
      episodes,
      video_id,
      trailer_id,
    } = req.body;

    const serial = new Serial({
      title,
      genre,
      director,
      cast,
      rating,
      year_of_release,
      poster,
      details,
      episodes,
      video_id,
      trailer_id,
    });

    await serial.save();

    res.status(201).json({ message: "Serial created successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the serial." });
  }
});

// Get all serials (accessible to all users)
router.get("/", async (req, res) => {
  try {
    console.log(req.query);
    let { title } = req.query;
    title = title ? title.toLowerCase() : null;

    let query = {};
    if (title) {
      query.title = title;
    }

    const serials = await Serial.find(query).sort({ episodes: 1 });

    res.status(200).send(serials);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// Update a serial (accessible only to admins)
router.put("/:id", authMiddleware.verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSerialData = req.body;

    const serial = await Serial.findByIdAndUpdate(id, updatedSerialData);

    if (!serial) {
      return res.status(404).json({ error: "Serial not found." });
    }

    res.json({ message: "Serial updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the serial." });
  }
});

// Delete a serial (accessible only to admins)
router.delete("/:id", authMiddleware.verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;

    const serial = await Serial.findByIdAndDelete(id);
    if (!serial) {
      return res.status(404).json({ error: "Serial not found." });
    }

    res.json({ message: "Serial deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the serial." });
  }
});

module.exports = router;
