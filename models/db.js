const mysql = require("mysql2/promise");

// https://www.npmjs.com/package/mysql2#using-connection-pools - Using connection pools
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "dbbyggemarked",
});

module.exports = pool;
