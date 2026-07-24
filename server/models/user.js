// Import mongoose so we can define the schema and create the model.
const mongoose = require("mongoose");

// A schema is the blueprint for how one user document should look in MongoDB.
const userSchema = new mongoose.Schema(
  {
    // Store the user's name.
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Store the user's email.
    // unique: true means two users should not have the same email.
    // lowercase: true converts the email to lowercase before saving.
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    // Store the hashed password.
    // We never want to save a plain text password in the database.
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // Role decides what permissions the user will have.
    // admin gets extra access, member gets normal access.
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
  },
  {
    // Automatically add createdAt and updatedAt fields.
    timestamps: true,
  }
);

// Turn the schema into a model.
// This model gives us functions like findOne(), findById(), and save().
module.exports = mongoose.model("User", userSchema);
