// Import jsonwebtoken so we can verify JWT tokens sent by the client.
const jwt = require("jsonwebtoken");

// This middleware protects routes that should only be accessible to logged-in users.
// It checks the token, verifies it, and then stores user data on req.user.
const protect = (req, res, next) => {
  try {
    // Read the Authorization header from the incoming request.
    // Example header value:
    // Authorization: Bearer eyJhbGciOi...
    const authHeader = req.headers.authorization;

    // If the header is missing, or it does not start with "Bearer ",
    // then the client did not send a valid token in the expected format.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Split "Bearer token_here" into ["Bearer", "token_here"]
    // and take the actual token part.
    const token = authHeader.split(" ")[1];

    // Verify the token using the secret key from .env.
    // If the token is valid, jwt.verify returns the decoded payload.
    // In our app, that payload contains things like userId and role.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user info to the request object
    // so the next middleware or route can use req.user.
    req.user = decoded;

    // Token is valid, so continue to the next middleware or route handler.
    next();
  } catch (error) {
    // If token verification fails, it may be invalid, expired, or tampered with.
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Export this middleware so server.js and routes can use it.
module.exports = protect;
