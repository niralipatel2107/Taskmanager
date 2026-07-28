const mongoose = require("mongoose");

// This schema describes what one issue document should look like in MongoDB.
const issueSchema = new mongoose.Schema(
  {
    // Short summary of the issue.
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // Full explanation of the issue.
    description: {
      type: String,
      required: true,
      trim: true,
    },
    // Tracks the current progress state of the issue.
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"],
      default: "open",
    },
    // Tells us how urgent the issue is.
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    // Stores the id of the user who created the issue.
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Stores the id of the user assigned to work on the issue.
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    // Adds createdAt and updatedAt automatically.
    timestamps: true,
  }
);

// Export the Issue model so routes can create and read issues.
module.exports = mongoose.model("Issue", issueSchema);
