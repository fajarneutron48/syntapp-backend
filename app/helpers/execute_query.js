const db = require("../config/database");

exports.executeQuery = (query, values = []) => {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};
