const express = require("express");
const app = express();
const connectDB = require("./controllers/db");
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");
const serialRoutes = require("./routes/serial");
const songRoutes = require("./routes/Song");
const trendingRoutes = require("./routes/Trending");
const musicRoutes = require("./routes/Music");
const favoriteRoutes = require("./routes/favorites");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/musics", musicRoutes);
app.use("/api/serials", serialRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/trending", trendingRoutes);
app.use("/api/favorites", favoriteRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
