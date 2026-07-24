// Import mongoose so we can connect Node/Express to MongoDB.
const mongoose = require("mongoose");

// This function opens the database connection.
// We keep it in a separate file so server.js stays clean and easy to read.
const connectDB = async () => {
  try {
    // Use the MongoDB connection string stored in .env.
    await mongoose.connect(process.env.MONGO_URI);

    // If connection succeeds, show a success message in the terminal.
    console.log("MongoDB connected");
  } catch (error) {
    // If connection fails, show the reason.
    console.error("MongoDB connection error:", error.message);

    // Stop the app if DB connection fails.
    // A backend that cannot reach the database should not keep running normally.
    process.exit(1);
  }
};

// Export the function so server.js can call connectDB().
module.exports = connectDB;
