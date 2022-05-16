const mysql = require("mysql2/promise");

// https://www.npmjs.com/package/mysql2#using-connection-pools - Using connection pools
module.exports = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "dbbyggemarked",
});
