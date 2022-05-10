'use strict';
/*
 * models
 * handlers for data manipulation
 */
const maria = require("mysql2/promise"); // file system access
const pool = require('./db.js');

module.exports = {
    async getproduct(req, res) {
        try {
            const varenummer = req.params.id;
            console.log(varenummer);
            // const dbh = await maria.createConnection(dbp);
            let sql = `SELECT * FROM vare WHERE varenummer = ?`
            let input = [varenummer];
            let row = await pool.query(sql, input);
            return row;
        } catch (e) {
            return e;
        }
    },
    async getAllproduct(req, res) {
        try {
            let sql = `SELECT * FROM vare`
            let row = await pool.query(sql);
            return row;
        } catch (e) {
            return e;
        }
    }
}
