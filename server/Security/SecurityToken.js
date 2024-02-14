const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: "Немає токену" });
  }

  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(401).json({ message: "Недійсний токен" });
    }
    req.userId = decoded.userId;
    next();
  });
}

module.exports = verifyToken;
