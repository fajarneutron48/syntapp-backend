const router = require("express").Router();
const { response, badRequest } = require("./response");
const { body } = require("express-validator");
const { executeQuery } = require("../helpers/execute_query");
const { validate } = require("../middleware/auth_middleware");
const { checkToken } = require("../middleware/check_token");

const validateData = [body("name").notEmpty().withMessage("Nama harus diisi.")];

// GET
router.get("/", checkToken, async (req, res) => {
  try {
    const query = "SELECT * FROM xxxs ORDER BY id DESC";
    const results = await executeQuery(query);

    return response(200, results, "List data xxxs has found!", res);
  } catch (error) {
    badRequest(error, res);
  }
});

// GET ONE
router.get("/:id", checkToken, async (req, res) => {
  try {
    const query = `SELECT * FROM xxxs WHERE id=${req.params.id}`;
    const results = await executeQuery(query);

    if (results.length === 0) {
      return response(404, null, "Data xxx not found!!", res);
    }

    return response(200, results, "Data xxx has found!", res);
  } catch (error) {
    return badRequest(error, res);
  }
});

// CREATE
router.post("/", [checkToken, validateData, validate], async (req, res) => {
  try {
    const query = `INSERT INTO xxxs SET ?`;
    const { name } = req.body;
    const body = { name };
    const results = await executeQuery(query, body);

    body["id"] = results.insertId;
    return response(201, [body], "Data xxx has been added!", res);
  } catch (error) {
    return badRequest(error, res);
  }
});

// UPDATE
router.put("/:id", [checkToken, validateData, validate], async (req, res) => {
  try {
    const query = `UPDATE xxxs SET ? WHERE id=${req.params.id}`;
    const { name } = req.body;
    const body = { name };
    const results = await executeQuery(query, body);

    if (results.affectedRows === 0) {
      return response(404, null, "Data xxx not found!!", res);
    }

    body["id"] = results.affectedRows;
    return response(
      200,
      [body],
      `Data xxx has been updated: ${results.affectedRows} rows`,
      res
    );
  } catch (error) {
    return badRequest(error, res);
  }
});

// DELETE
router.delete("/:id", checkToken, async (req, res) => {
  try {
    const query = `DELETE FROM xxxs WHERE id=${req.params.id}`;
    const results = await executeQuery(query);

    if (results.affectedRows === 0) {
      return response(404, null, "Data xxx not found!!", res);
    }

    return response(
      200,
      null,
      `Data xxx has been deleted: ${results.affectedRows} rows`,
      res
    );
  } catch (error) {
    return badRequest(error, res);
  }
});

module.exports = router;
