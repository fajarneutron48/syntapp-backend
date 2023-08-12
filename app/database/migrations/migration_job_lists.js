const db = require("../../config/database");

const jobSql = `CREATE TABLE job_lists
        (
          id INT AUTO_INCREMENT PRIMARY KEY,
          apply_at DATETIME,
          company VARCHAR(255),
          type_id INT,
          category VARCHAR(255),
          via_id INT,
          position_id INT,
          role VARCHAR(255),
          condition_id INT,
          final_result_id INT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`;

db.query(jobSql, (err, rows) => {
  if (err) throw err;
  console.log("Table jobs has been created!");
  process.exit(1);
});

module.exports = db;
