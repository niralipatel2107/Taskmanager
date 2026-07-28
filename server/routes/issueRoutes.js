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

router.get("/", protect, async (req, res) => {
    try {
        const issues = await Issue.find().sort({ createdAt: -1 });

        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/:id", protect, async (req, res) => {
    try {
        const issueId = req.params.id;
        const issue = await Issue.findById(issueId);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found",
            })
        }
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid issue id",
            });
        }
    }
})

// Update one issue by id.
// Only logged-in users can access this route.
router.put("/:id", protect, async (req, res) => {
  try {
    // Get the id from the URL.
    const issueId = req.params.id;

    // Get updated values from request body.
    const { title, description, status, priority, assignedTo } = req.body;

    // Find the issue in MongoDB first.
    const issue = await Issue.findById(issueId);

    // If no issue exists with this id, send 404.
    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    // Allow update only if:
    // 1. logged-in user created this issue
    // 2. or logged-in user is admin
    if (
      issue.createdBy.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "You are not allowed to update this issue",
      });
    }

    // Update only the fields that were sent in the request.
    if (title !== undefined) {
      issue.title = title;
    }

    if (description !== undefined) {
      issue.description = description;
    }

    if (status !== undefined) {
      issue.status = status;
    }

    if (priority !== undefined) {
      issue.priority = priority;
    }

    if (assignedTo !== undefined) {
      issue.assignedTo = assignedTo;
    }

    // Save updated issue in MongoDB.
    const updatedIssue = await issue.save();

    // Send updated issue back to client.
    res.status(200).json(updatedIssue);
  } catch (error) {
    // If id format is wrong, send 400.
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid issue id",
      });
    }

    // Any other error comes here.
    res.status(500).json({
      message: error.message,
    });
  }
});
// Delete one issue by id.
// Only logged-in users can access this route.
router.delete("/:id", protect, async (req, res) => {
  try {
    // Get the issue id from the URL.
    const issueId = req.params.id;

    // Find the issue first so we can:
    // 1. check if it exists
    // 2. check if user is allowed to delete it
    const issue = await Issue.findById(issueId);

    // If issue does not exist, send 404.
    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    // Allow delete only if:
    // 1. logged-in user created this issue
    // 2. or logged-in user is admin
    if (
      issue.createdBy.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "You are not allowed to delete this issue",
      });
    }

    // Delete the issue from MongoDB.
    await issue.deleteOne();

    // Send success message after deletion.
    res.status(200).json({
      message: "Issue deleted successfully",
    });
  } catch (error) {
    // If id format is invalid, send 400.
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid issue id",
      });
    }

    // Any other unexpected error comes here.
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;
