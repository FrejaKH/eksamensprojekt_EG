const mysql = require("mysql2/promise");

/* CRUD ACTIVITIES */
// https://www.npmjs.com/package/mysql2#using-connection-pools - Using connection pools
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "dbbyggemarked",
});

/* PASSPORT */
const passport = {
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
  },
  database: "dbbyggemarked",
  users_table: "user_table",
};

module.exports = { passport, pool };
