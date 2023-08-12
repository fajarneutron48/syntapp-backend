const db = require("../../config/database");

const userSql = `CREATE TABLE users
        (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          username VARCHAR(255),
          password VARCHAR(255),
          token VARCHAR(255),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`;

db.query(userSql, (err, rows) => {
  if (err) throw err;
  console.log("Table users has been created!");
  process.exit(1);
});

module.exports = db;
