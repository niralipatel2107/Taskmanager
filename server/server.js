const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes)
app.get("/", (req, res) => {
  res.send("Team Issue Tracker backend is running");
});

app.get("/api/health", (req, res) => {
  res.json({
    message: "API is healthy",
    status: "ok",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});