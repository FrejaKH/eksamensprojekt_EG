"use strict";
/*
 * models
 * handlers for data manipulation
 */
const maria = require("mysql2/promise"); // file system access
const pool = require("./db.js");

module.exports = {
  // get a specific product.
  async getproduct(req, res) {
    try {
      const { id } = req.params;
      let sql = `SELECT * FROM vare WHERE varenummer = ?`;
      let varenummer = [id];
      let row = await pool.query(sql, varenummer);
      return row;
    } catch (e) {
      console.error(e.message);
    }
  },
  // get all products.
  async getAllproduct(req, res) {
    try {
      let sql = `SELECT * FROM vare`;
      let row = await pool.query(sql);
      return row;
    } catch (e) {
      console.error(e.message);
    }
  },
  // delete a product.
  async deleteAProduct(req, res) {
    try {
      const { id } = req.params;
      let sql = `DELETE FROM vare WHERE varenummer = ?`;
      let varenummer = [id];
      await pool.query(sql, varenummer);
      return true;
    } catch (e) {
      console.error(e.message);
    }
  },
  // create a product.
  async createAProduct(req, res) {
    try {
      const {
        varenummer,
        prisenhed,
        beskrivelse,
        enhedsbetegnelse,
        indkøbspris,
        billede,
        EAN,
        vareundergruppe,
      } = req.body;
      let sql = `INSERT INTO vare (varenummer,prisenhed, beskrivelse, enhedsbetegnelse, indkøbspris, billede, EAN, vareundergruppe) VALUES (?,?,?,?,?,?,?,?)`;
      let vare = [
        varenummer,
        prisenhed,
        beskrivelse,
        enhedsbetegnelse,
        indkøbspris,
        billede,
        EAN,
        vareundergruppe,
      ];
      await pool.query(sql, vare);
      return true;
    } catch (e) {
      console.error(e.message);
    }
  },
  // create a product.
  async updateAProduct(req, res) {
    try {
      const { id } = req.params;
      const {
        prisenhed,
        beskrivelse,
        enhedsbetegnelse,
        indkøbspris,
        billede,
        EAN,
        vareundergruppe,
      } = req.body;
      let sql = `update vare SET prisenhed=?, beskrivelse=?, enhedsbetegnelse=?, indkøbspris=?, billede=?, EAN=?, vareundergruppe=? WHERE varenummer = ?`;
      let vare = [
        prisenhed,
        beskrivelse,
        enhedsbetegnelse,
        indkøbspris,
        billede,
        EAN,
        vareundergruppe,
        id,
      ];
      await pool.query(sql, vare);
      return true;
    } catch (e) {
      console.error(e.message);
    }
  },
};
