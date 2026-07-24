// This middleware checks whether the logged-in user has one of the allowed roles.
// Example usage:
// authorizeRoles("admin")
// authorizeRoles("admin", "member")
const authorizeRoles = (...allowedRoles) => {
  // Return the real Express middleware function.
  return (req, res, next) => {
    // req.user comes from the auth middleware.
    // If req.user does not exist, or the role is not in the allowed list,
    // then the user is not allowed to access this route.
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // The role is allowed, so continue to the route handler.
    next();
  };
};

// Export the middleware factory so it can be used in server.js or routes.
module.exports = authorizeRoles;
