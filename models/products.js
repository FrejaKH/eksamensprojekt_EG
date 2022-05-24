const pool = require("./db.js");

module.exports = {
  // get a specific product.
  async getproduct(req, res) {
    try {
      const { varenummer } = req.params;
      let sql = `SELECT * FROM vare WHERE varenummer = ?`;
      let varenummerId = [varenummer];
      let row = await pool.query(sql, varenummerId);
      return row;
    } catch (e) {
      console.error(e.message);
    }
  },
  async getupdateAproduct(req, res) {
    try {
      const { id } = req.params;
      let sql = `SELECT * FROM vare WHERE varenummer = ?`;
      let varenummerId = [id];
      let row = await pool.query(sql, varenummerId);
      return row;
    } catch (e) {
      console.error(e.message);
    }
  },
  async getNewupdateAproduct(req, res, newVarenummer) {
    try {
      // const { id } = req.params;
      let sql = `SELECT * FROM vare WHERE varenummer = ?`;
      let varenummerId = [newVarenummer];
      let row = await pool.query(sql, varenummerId);
      return row;
    } catch (e) {
      console.error(e.message);
    }
  },
  async getVare(req, res) {
    try {
      // const { id } = req.params;
      let sql = `SELECT * FROM vare WHERE vareundergruppe = ?`;
      let undergruppe = [3640];
      let row = await pool.query(sql, undergruppe);
      return row;
    } catch (e) {
      console.error(e.message);
    }
  },
  async getVareUnderGruppe(req, res) {
    try {
      let sql = `SELECT vareundergruppe, beskrivelse FROM vareundergruppe`;
      let row = await pool.query(sql);
      console.log(row);
      return row;
    } catch (e) {
      console.error(e.message);
    }
  },
  // get all products.
  async getAllproducts(req, res) {
    try {
      let sql = `SELECT * FROM vare`;
      let row = await pool.query(sql);
      return row;
    } catch (e) {
      console.error(e.message);
    }
  },
  // get all products.
  async officeSearch(req, res) {
    try {
      let sql = `SELECT * FROM vare WHERE varenavn LIKE "%${req.body.search}%"`;
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
      let {
        varenummer,
        varenavn,
        varebeskrivelse,
        pris,
        enhedsbetegnelse,
        indkøbspris,
        contenttype,
        EAN,
        vareundergruppe,
      } = req.body;
      let billede = req.file.buffer;

      let sql = `INSERT INTO vare ( varenummer, varenavn, varebeskrivelse, pris, enhedsbetegnelse, indkøbspris, contenttype, EAN, vareundergruppe, billede) VALUES (?,?,?,?,?,?,?,?,?,?)`;
      let vare = [
        varenummer,
        varenavn,
        varebeskrivelse,
        pris,
        enhedsbetegnelse,
        indkøbspris,
        contenttype,
        EAN,
        vareundergruppe,
        billede,
      ];
      await pool.query(sql, vare);
      return true;
    } catch (e) {
      console.error(e.message);
      return false;
    }
  },
  // create a product.
  async updateAProduct(req, res) {
    try {
      let {
        varenummer,
        varenavn,
        varebeskrivelse,
        pris,
        enhedsbetegnelse,
        indkøbspris,
        contenttype,
        EAN,
        vareundergruppe,
      } = req.body;
      // let billede = req.file.buffer;
      await pool.query(
        "UPDATE vare SET varenummer = ?, varenavn = ?, varebeskrivelse= ?, pris= ?, enhedsbetegnelse= ?, indkøbspris= ?, contenttype= ?, EAN= ?, vareundergruppe= ? WHERE varenummer = ?",
        [
          varenummer,
          varenavn,
          varebeskrivelse,
          pris,
          enhedsbetegnelse,
          indkøbspris,
          contenttype,
          EAN,
          vareundergruppe,
          req.params.id,
        ]
      );
      return varenummer;
    } catch (e) {
      console.error(e.message);
    }
  },
  // get a list of associated products.
  async getAssociatedProducts(req, res) {
    try {
      //Først henter vi undergruppe fra produktet
      const { varenummer } = req.params;
      let sqlVareundergruppe = `SELECT vareundergruppe FROM vare WHERE varenummer = ?`;
      let varenummerId = [varenummer];
      let row = await pool.query(sqlVareundergruppe, varenummerId);

      //Dernæst bruger vi undergruppen til at finde hovedgruppen
      let sqlVarehovedgruppe = `SELECT vareundergruppe, varehovedgruppe 
          FROM vareundergruppe 
          WHERE vareundergruppe = ?`;
      let vareundergruppe = [row[0][0].vareundergruppe];
      row = await pool.query(sqlVarehovedgruppe, vareundergruppe);

        //Til sidst finder vi alle undergrupper relateret til hovedgruppen, minus den valgte undergruppe
        let sqlAnbefalet = `SELECT * FROM vareundergruppe WHERE varehovedgruppe = ? AND vareundergruppe != ? ORDER BY rand() LIMIT 2`;
        let vareParams = [row[0][0].varehovedgruppe, row[0][0].vareundergruppe];
        row = await pool.query(sqlAnbefalet, vareParams);

      console.log(row[0]);

      return row;
    } catch (e) {
      console.error(e.message);
    }
  },
};
