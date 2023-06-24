const express = require("express");
const app = express();
const connectDB = require("./controllers/db");
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");
const serialRoutes = require("./routes/serial");
const songRoutes = require("./routes/Song"); // Add this line
const favoriteRoutes = require("./routes/favorites");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/serials", serialRoutes);
app.use("/api/songs", songRoutes); // Add this line
app.use("/api/favorites", favoriteRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
