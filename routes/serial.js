const express = require("express");
const router = express.Router();
const Serial = require("../models/Serial");
const authMiddleware = require("../middlewares/auth");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const objectId = new ObjectId();

router.post("/", async (req, res) => {
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
    });

    await serial.save();

    res.status(201).json({ message: "Serial created successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the serial." });
  }
});

// router.get("/",async(req,res)=>{
//   console.log(req.query)
//   let {title} = req.query
//   title = title ?  title.toLowerCase() : null
//  try {
//   const serials = await Serial.find({"title":title})
//   res.status(200).send(serials)
//  } catch (error) {
//   res.status(400).send({"msg":error.message})
//  }
// })

router.get("/", async (req, res) => {
  console.log(req.query);
  let { title } = req.query;
  title = title ? title.toLowerCase() : null;
  try {
    let query = {};

    if (title) {
      query.title = title;
    }

    const serials = await Serial.find(query).sort({ year_of_release: 1 });

    res.status(200).send(serials);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSerialData = req.body;

    const serial = await Serial.findByIdAndUpdate(id, updatedSerialData);

    if (!serial) {
      return res.status(404).json({ error: "Serial not found." });
    }

    res.json({ message: "Serial updated successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the serial." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const serial = await Serial.findByIdAndDelete(id);
    if (!serial) {
      return res.status(404).json({ error: "Serial not found." });
    }

    res.json({ message: "Serial deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the serial." });
  }
});

module.exports = router;
