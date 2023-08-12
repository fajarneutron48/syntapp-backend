require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const { validate } = require("../middleware/auth_middleware");
const { executeQuery } = require("../helpers/execute_query");
const { badRequest } = require("./response");
const { response } = require("../controllers/response");

const validateData = [
  body("username").notEmpty().withMessage("Username tidak boleh kosong!"),
  body("password").notEmpty().withMessage("Password tidak boleh kosong!"),
];

const secretKey = process.env.SECRET_KEY;

router.post("/login", validateData, validate, async (req, res) => {
  try {
    const { username, password } = req.body;
    const password_hash = btoa(password);
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    const results = await executeQuery(query, [username, password_hash]);

    if (results.length === 0) {
      return res.status(401).json({ error: "Username atau Password salah!!!" });
    }

    const token = jwt.sign({ username: results[0].username }, secretKey, {
      expiresIn: "1h",
    });

    const queryUsers = `UPDATE users SET ? WHERE id = ${results[0].id}`;
    await executeQuery(queryUsers, [{ token }]);

    const result = await executeQuery(query, [username, password_hash]);
    return response(200, result, "Token has been created!", res);
  } catch (error) {
    return badRequest(error, res);
  }
});

module.exports = router;
