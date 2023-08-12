const db = require("../../config/database");

const conditionSql = `CREATE TABLE conditions
        (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`;

db.query(conditionSql, (err, rows) => {
  if (err) throw err;
  console.log("Table conditions has been created!");
  process.exit(1);
});

module.exports = db;
