const db = require("../../config/database");

const viaSql = `CREATE TABLE vias
        (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`;

db.query(viaSql, (err, rows) => {
  if (err) throw err;
  console.log("Table vias has been created!");
  process.exit(1);
});

module.exports = db;
