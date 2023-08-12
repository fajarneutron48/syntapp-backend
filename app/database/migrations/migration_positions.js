const db = require("../../config/database");

const positionSql = `CREATE TABLE positions
        (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`;

db.query(positionSql, (err, rows) => {
  if (err) throw err;
  console.log("Table positions has been created!");
  process.exit(1);
});

module.exports = db;
