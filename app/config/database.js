require("dotenv").config();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "id21084887_root",
  password: "Fajaradmin123",
  database: "id21084887_synt_app_db",
  port: 3306,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = db;
