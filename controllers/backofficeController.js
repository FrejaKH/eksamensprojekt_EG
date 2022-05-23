const pool = require("../models/db");

/* GET BACKOFFICE PAGE */
exports.backoffice = async (req, res) => {
  try {
    const vare = await pool.query("SELECT * FROM vare");
    res.render("backoffice/backoffice", {
      vare: vare[0],
    });
  } catch (err) {
    console.error(err.message);
  }
};

/* FIND A VARE */
exports.backofficeSearch = async (req, res) => {
  try {
    const search = req.body.search;
    const vare = await pool.query(
      `SELECT * FROM vare WHERE varenavn LIKE "%${search}%"`
    );
    res.render("backoffice/backoffice", { vare: vare[0]});
  } catch (err) {
    console.error(err.message);
  }
};

/* GET CREATE PAGE */
exports.create = async (req, res) => {
  res.render("backoffice/create", { title: "Opret vare", alert: "" });
};

/* CREATE A VARE */
exports.createVare = async (req, res) => {
  try {
    const {
      varenavn,
      varebeskrivelse,
      pris,
      enhedsbetegnelse,
      indkøbspris,
      contenttype,
      EAN,
      vareundergruppe,
    } = req.body;
    await pool.query(
      "INSERT INTO vare SET varenavn = ?, varebeskrivelse= ?, pris= ?, enhedsbetegnelse= ?, indkøbspris= ?, contenttype= ?, EAN= ?, vareundergruppe= ?",
      [
        varenavn,
        varebeskrivelse,
        pris,
        enhedsbetegnelse,
        indkøbspris,
        contenttype,
        EAN,
        vareundergruppe,
      ]
    );
    res.render("backoffice/create", {
      title: "Opret vare",
      alert: "Vare oprettet!",
    });
  } catch (err) {
    console.error(err.message);
  }
};

/* GET UPDATE PAGE */
exports.update = async (req, res) => {
  try {
    const vare = await pool.query("SELECT * FROM vare WHERE varenummer = ?", [
      req.params.id,
    ]);
    res.render("backoffice/update", {
      vare: vare[0][0],
      title: "Opdater vare",
      alert: "",
    });
  } catch (err) {
    console.error(err.message);
  }
};

/* UPDATE A VARE */
exports.updateVare = async (req, res) => {
  try {
    const {
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
      "UPDATE vare SET varenavn = ?, varebeskrivelse= ?, pris= ?, enhedsbetegnelse= ?, indkøbspris= ?, billede= ?, contenttype= ?, EAN= ?, vareundergruppe= ? WHERE varenummer = ?",
      [
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
  } catch (err) {
    console.error(err.message);
  }
};

/* DELETE A VARE */
exports.deleteVare = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM vare WHERE varenummer = ?", [id]);
    res.redirect(`backoffice`);
  } catch (err) {
    console.error(err.message);
  }
};
