const jwt = require("jsonwebtoken");

function verifyTokenAndUser(req, res, next) {
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
    if (req.params.userId && req.params.userId !== decoded.userId) {
      return res.status(403).json({ message: "Недостатньо прав доступу" });
    }
    req.userData = { userId: decoded.userId };
    next();
  });
}

module.exports = verifyTokenAndUser;
