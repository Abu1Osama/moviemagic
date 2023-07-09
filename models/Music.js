const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  title: String,
  duration: String,
  releaseYear: Number,
  video_id: String,
  Singer:[String],
  Poster:String
});

module.exports = mongoose.model("music", musicSchema);
