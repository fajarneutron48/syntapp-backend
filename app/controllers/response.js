const response = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    payload: {
      status_code: statusCode,
      message: message,
      data: data,
    },
  });
};

const badRequest = (err, res) => {
  res.status(500).json({
    payload: {
      status_code: 500,
      message: "Internal Server Error!!!",
      error: err,
    },
  });
};

const validateResponse = (errors, res) => {
  res.status(422).json({
    payload: {
      status_code: 422,
      error: errors.array(),
    },
  });
};

module.exports = { response, badRequest, validateResponse };
