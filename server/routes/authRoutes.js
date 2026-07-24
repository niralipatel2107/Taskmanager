// Import the tools needed for auth routes.
const express = require("express");

// bcrypt is used to hash passwords and compare them safely.
const bcrypt = require("bcryptjs");

// jwt is used to create JSON Web Tokens after signup/login.
const jwt = require("jsonwebtoken");

// Import the User model so we can create users and search users in MongoDB.
const User = require("../models/User");

// Create a router to keep auth routes separate from server.js.
const router = express.Router();

// Signup route
// This creates a brand-new user account.
router.post("/signup", async (req, res) => {
  try {
    // Read the values sent from Postman or the frontend.
    const { name, email, password, role } = req.body;

    // Basic validation: name, email, and password must be provided.
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    // Check if another user already exists with the same email.
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Convert the plain password into a secure hashed password.
    // We never save the real plain text password directly in MongoDB.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document using the validated data.
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "member",
    });

    // Save the new user in MongoDB.
    const savedUser = await newUser.save();

    // Create a JWT token that stores the user's id and role.
    // This token will later be sent in protected requests.
    const token = jwt.sign(
      {
        userId: savedUser._id,
        role: savedUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    // Send success response back to the client.
    // We return the token and safe user information.
    // Notice that we do NOT return the password.
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    // If anything unexpected breaks, return a server error response.
    res.status(500).json({ message: error.message });
  }
});

// Login route
// This checks whether an existing user entered correct credentials.
router.post("/login", async (req, res) => {
  try {
    // Read email and password from the request body.
    const { email, password } = req.body;

    // Both values are required for login.
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Search the database for a user with this email.
    const user = await User.findOne({ email });

    // If no user is found, login should fail.
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Compare the plain password from login with the hashed password in DB.
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, login fails.
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Create a fresh token for the logged-in user.
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    // Send success response with token and safe user data.
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // Handle unexpected server errors.
    res.status(500).json({ message: error.message });
  }
});

// Export the router so server.js can mount these auth routes.
module.exports = router;
