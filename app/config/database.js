require("dotenv").config();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "mariaDbSyntNodejs",
  user: "root",
  password: "fajaradmin",
  database: "synt_db",
  port: 3306,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = db;
