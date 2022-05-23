const pool = require("../models/db");

/* GET BACKOFFICE PAGE */
exports.backoffice = async (req, res) => {
  try {
    let sql = `SELECT * FROM vare`;
    let vare = await pool.query(sql);
    res.render("backoffice/backoffice", {
      vare: vare[0],
    });
  } catch (e) {
    console.error(e.message);
  }
};

/* FIND A VARE */
exports.backofficeSearch = async (req, res) => {
  try {
    let search = req.body.search;
    let sql = `SELECT * FROM vare WHERE varenavn LIKE "%${search}%"`;
    let vare = await pool.query(sql);
    res.render("backoffice/backoffice", { vare: vare[0] });
  } catch (e) {
    console.error(e.message);
  }
};

/* GET CREATE PAGE */
exports.create = async (req, res) => {
  try {
    let sql = `SELECT vareundergruppe FROM vareundergruppe`;
    let vare = await pool.query(sql);
    res.render("backoffice/create", {
      title: "Opret vare",
      alert: "",
      vareundergruppe: vare[0],
    });
  } catch (e) {
    console.error(e.message);
  }
};

/* CREATE A VARE */
exports.createVare = async (req, res) => {
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
    let sql = `INSERT INTO vare ( varenummer, varenavn, varebeskrivelse, pris, enhedsbetegnelse, indkøbspris, contenttype, EAN, vareundergruppe) VALUES (?,?,?,?,?,?,?,?,?)`;
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
    ];
    await pool.query(sql, vare);
    res.render("backoffice/create", {
      title: "Opret vare",
      alert: "Vare oprettet!",
    });
    return true;
  } catch (e) {
    console.error(e.message);
  }
};

/* GET UPDATE PAGE */
exports.update = async (req, res) => {
  try {
    let sql = "SELECT * FROM vare WHERE varenummer = ?";
    let vare = await pool.query(sql, [req.params.id]);
    res.render("backoffice/update", {
      vare: vare[0][0],
      title: "Opdater vare",
      alert: "",
    });
  } catch (e) {
    console.error(e.message);
  }
};

/* UPDATE A VARE */
exports.updateVare = async (req, res) => {
  try {
    let {
      varenummer,
      varenavn,
      varebeskrivelse,
      pris,
      enhedsbetegnelse,
      indkøbspris,
      billede,
      contenttype,
      EAN,
      vareundergruppe,
    } = req.body;
    await pool.query(
      "UPDATE vare SET varenummer = ?, varenavn = ?, varebeskrivelse= ?, pris= ?, enhedsbetegnelse= ?, indkøbspris= ?, billede= ?, contenttype= ?, EAN= ?, vareundergruppe= ? WHERE varenummer = ?",
      [
        varenummer,
        varenavn,
        varebeskrivelse,
        pris,
        enhedsbetegnelse,
        indkøbspris,
        billede,
        contenttype,
        EAN,
        vareundergruppe,
        req.params.id,
      ]
    );
    // Stay on page after submit
    const vare = await pool.query("SELECT * FROM vare WHERE varenummer = ?", [
      req.params.id,
    ]);
    res.render("backoffice/update", {
      vare: vare[0][0],
      title: "Opdater vare",
      alert: "Vare opdateret!",
    });
  } catch (e) {
    console.error(e.message);
  }
};

/* DELETE A VARE */
exports.deleteVare = async (req, res) => {
  try {
    let { id } = req.params;
    let sql = "DELETE FROM vare WHERE varenummer = ?";
    await pool.query(sql, [id]);
    res.redirect(`backoffice`);
  } catch (e) {
    console.error(e.message);
  }
};
