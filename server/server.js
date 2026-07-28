// Import the packages and local modules we need for the backend.
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const authorizeRoles = require("./middleware/roleMiddleware");
const issueRoutes = require("./routes/issueRoutes");
// Load values from .env into process.env.
dotenv.config();

// Connect the backend to MongoDB before handling requests.
connectDB();

// Create the Express application.
const app = express();

// Use the port from .env, or 5000 if .env does not provide one.
const PORT = process.env.PORT || 5000;

// Middleware
// cors() allows the frontend to call this backend from another origin/port.
app.use(cors());

// express.json() lets Express read JSON data from req.body.
app.use(express.json());

// Any route that starts with /api/auth will use the routes from authRoutes.js.
app.use("/api/auth", authRoutes);
app.use("/api/issues",issueRoutes);
// Simple home route to confirm the backend is running.
app.get("/", (req, res) => {
  res.send("Team Issue Tracker backend is running");
});

// Health route used to quickly check whether the API is alive.
app.get("/api/health", (req, res) => {
  res.json({
    message: "API is healthy",
    status: "ok",
  });
});

// Protected route example.
// protect middleware checks the JWT token before allowing access.
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: req.user,
  });
});

// Admin-only route example.
// First protect checks login, then authorizeRoles("admin") checks role.
app.get("/api/admin-only", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin",
    user: req.user,
  });
});

// Start the server and listen for incoming requests.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
