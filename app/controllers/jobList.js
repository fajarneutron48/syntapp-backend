const router = require("express").Router();
const { response, badRequest } = require("./response");
const { body } = require("express-validator");
const { executeQuery } = require("../helpers/execute_query");
const { validate } = require("../middleware/auth_middleware");
const { checkToken } = require("../middleware/check_token");

const validateData = [
  body("company").notEmpty().withMessage("Nama harus diisi."),
];

// GET
router.get("/", checkToken, async (req, res) => {
  try {
    const query = `SELECT job_lists.*, types.name name_type, vias.name name_via, positions.name name_position, conditions.name name_condition, final_results.name name_final_result
                      FROM (((((job_lists
                      LEFT JOIN types ON job_lists.type_id = types.id)
                      LEFT JOIN conditions ON job_lists.condition_id = conditions.id)
                      LEFT JOIN final_results ON job_lists.final_result_id = final_results.id)
                      LEFT JOIN vias ON job_lists.via_id = vias.id)
                      LEFT JOIN positions ON job_lists.position_id = positions.id)`;

    const results = await executeQuery(query);

    return response(200, results, "List data job_lists has found!", res);
  } catch (error) {
    badRequest(error, res);
  }
});

// GET ONE
router.get("/:id", checkToken, async (req, res) => {
  try {
    const queryJob = `SELECT * FROM job_lists WHERE id=${req.params.id}`;
    const queryType = "SELECT * FROM types ORDER BY id DESC";
    const queryVia = "SELECT * FROM vias ORDER BY id DESC";
    const queryPosition = "SELECT * FROM positions ORDER BY id DESC";
    const queryCondition = "SELECT * FROM conditions ORDER BY id DESC";
    const queryFinalResult = "SELECT * FROM final_results ORDER BY id DESC";

    const job_lists = await executeQuery(queryJob);
    const types = await executeQuery(queryType);
    const vias = await executeQuery(queryVia);
    const positions = await executeQuery(queryPosition);
    const conditions = await executeQuery(queryCondition);
    const final_results = await executeQuery(queryFinalResult);

    if (job_lists.length === 0) {
      return response(404, null, "Data job not found!!", res);
    }

    const results = {
      job_lists,
      types,
      vias,
      positions,
      conditions,
      final_results,
    };

    return response(200, results, "Data job has found!", res);
  } catch (error) {
    return badRequest(error, res);
  }
});

// CREATE
router.post("/", [checkToken, validateData, validate], async (req, res) => {
  try {
    const query = `INSERT INTO job_lists SET ?`;
    const {
      date,
      company,
      type_id,
      category,
      via_id,
      position_id,
      role,
      final_result_id,
    } = req.body;
    const body = {
      date,
      company,
      type_id,
      category,
      via_id,
      position_id,
      role,
      condition_id,
      final_result_id,
    };
    const results = await executeQuery(query, body);

    body["id"] = results.insertId;
    return response(201, [body], "Data job has been added!", res);
  } catch (error) {
    return badRequest(error, res);
  }
});

// UPDATE
router.put("/:id", [checkToken, validateData, validate], async (req, res) => {
  try {
    const query = `UPDATE job_lists SET ? WHERE id=${req.params.id}`;
    const {
      date,
      company,
      type_id,
      category,
      via_id,
      role,
      position_id,
      condition_id,
      final_id,
    } = req.body;
    const body = {
      date,
      company,
      type_id,
      category,
      via_id,
      position_id,
      role,
      condition_id,
      final_id,
    };
    const results = await executeQuery(query, body);

    if (results.affectedRows === 0) {
      return response(404, null, "Data job not found!!", res);
    }

    body["id"] = results.affectedRows;
    return response(
      200,
      [body],
      `Data job has been updated: ${results.affectedRows} rows`,
      res
    );
  } catch (error) {
    return badRequest(error, res);
  }
});

// DELETE
router.delete("/:id", checkToken, async (req, res) => {
  try {
    const query = `DELETE FROM job_lists WHERE id=${req.params.id}`;
    const results = await executeQuery(query);

    if (results.affectedRows === 0) {
      return response(404, null, "Data job not found!!", res);
    }

    return response(
      200,
      null,
      `Data job has been deleted: ${results.affectedRows} rows`,
      res
    );
  } catch (error) {
    return badRequest(error, res);
  }
});

module.exports = router;
