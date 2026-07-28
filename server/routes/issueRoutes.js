const express = require("express");
const Issue = require("../models/Issue");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new issue.
// Only logged-in users can create issues because protect runs first.
router.post("/", protect, async (req, res) => {
  try {
    // Read the data sent from Postman or the frontend.
    const { title, description, priority, assignedTo } = req.body;

    // Stop the request early if required values are missing.
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    // Build the new issue document before saving it.
    const newIssue = new Issue({
      title,
      description,
      priority,
      assignedTo: assignedTo || null,
      createdBy: req.user.userId,
    });

    // Save the issue in MongoDB.
    const savedIssue = await newIssue.save();

    // Send the saved issue back to the client.
    res.status(201).json(savedIssue);
  } catch (error) {
    // Send a clear error response if something goes wrong.
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
