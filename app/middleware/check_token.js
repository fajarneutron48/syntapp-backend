require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

exports.checkToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Token not found!" });
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token invalid!" });
    }
    req.user = user;
    next();
  });
};
