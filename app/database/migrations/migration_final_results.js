const db = require("../../config/database");

const finalSql = `CREATE TABLE final_results
        (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`;

db.query(finalSql, (err, rows) => {
  if (err) throw err;
  console.log("Table finals has been created!");
  process.exit(1);
});

module.exports = db;
