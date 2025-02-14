const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    //! Get the token from the header
    const token = req.headers?.authorization?.split(" ")[1];

    console.log("Token received in backend:", token); // Debugging

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    //! Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired, login again" });
        }
        return res.status(401).json({ message: "Invalid token" });
      }

      //! Save the user in req object
      req.user = decoded.id;
      next();
    });

  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = isAuthenticated;
