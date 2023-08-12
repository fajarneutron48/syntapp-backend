const router = require("express").Router();
const { response, badRequest } = require("./response");
const { body } = require("express-validator");
const { executeQuery } = require("../helpers/execute_query");
const { validate } = require("../middleware/auth_middleware");

const validateData = [
  body("name").notEmpty().withMessage("Nama harus diisi."),
  body("username").notEmpty().withMessage("Username harus diisi."),
  body("password").notEmpty().withMessage("Password harus diisi."),
];

// GET
router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM users ORDER BY id DESC";
    const results = await executeQuery(query);

    return response(200, results, "List data users has found!", res);
  } catch (error) {
    badRequest(error, res);
  }
});

// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const query = `SELECT * FROM users WHERE id=${req.params.id}`;
    const results = await executeQuery(query);

    if (results.length === 0) {
      return response(404, null, "Data user not found!!", res);
    }

    return response(200, results, "Data user has found!", res);
  } catch (error) {
    return badRequest(error, res);
  }
});

// CREATE
router.post("/", validateData, validate, async (req, res) => {
  try {
    const query = `INSERT INTO users SET ?`;
    const { name, username, password } = req.body;
    const password_hash = btoa(password);
    const body = { name, username, password: password_hash };
    const results = await executeQuery(query, body);

    body["id"] = results.insertId;
    return response(201, [body], "Data user has been added!", res);
  } catch (error) {
    return badRequest(error, res);
  }
});

// UPDATE
router.put("/:id", validateData, validate, async (req, res) => {
  try {
    const query = `UPDATE users SET ? WHERE id=${req.params.id}`;
    const { name, username, password } = req.body;
    const password_hash = btoa(password);
    const body = { name, username, password: password_hash };
    const results = await executeQuery(query, body);

    if (results.affectedRows === 0) {
      return response(404, null, "Data user not found!!", res);
    }

    body["id"] = results.affectedRows;
    return response(
      200,
      [body],
      `Data user has been updated: ${results.affectedRows} rows`,
      res
    );
  } catch (error) {
    return badRequest(error, res);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const query = `DELETE FROM users WHERE id=${req.params.id}`;
    const results = await executeQuery(query);

    if (results.affectedRows === 0) {
      return response(404, null, "Data user not found!!", res);
    }

    return response(
      200,
      null,
      `Data user has been deleted: ${results.affectedRows} rows`,
      res
    );
  } catch (error) {
    return badRequest(error, res);
  }
});

module.exports = router;
