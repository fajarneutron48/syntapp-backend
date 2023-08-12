const { validationResult } = require("express-validator");
const { validateResponse } = require("../controllers/response");

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validateResponse(errors, res);
  }
  next();
};
