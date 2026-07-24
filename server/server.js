const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware")
const authorizeRoles = require("./middleware/roleMiddleware")
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
app.get("/api/protected",protect, (req,res)=>{
  res.json({
    message:"you accepted a protected route",
    user:req.user,
  })
})
app.get("/api/admin-only",protect, authorizeRoles("admin"),(req,res)=>{
  res.json({
    message:"welcome Admin",
    user:req.user,
  })
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});