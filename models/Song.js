const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: String,
  artist: [String],
  duration: String,
  releaseYear: Number,
  video_id: String,
  Singer:[String]
});

module.exports = mongoose.model("Song", songSchema);
