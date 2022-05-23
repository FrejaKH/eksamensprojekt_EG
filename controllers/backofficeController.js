const model = require("../models/products");
const pool = require("../models/db");

/* GET BACKOFFICE PAGE */
exports.backoffice = async (req, res) => {
  let vare = await model.getAllproducts();
    res.render("backoffice/backoffice", {
      vare: vare[0],
    });
};

/* FIND A VARE */
exports.backofficeSearch = async (req, res) => {
  let vare = await model.officeSearch(req,res);
  res.render("backoffice/backoffice", { vare: vare[0] });

};

/* GET CREATE PAGE */
exports.create = async (req, res) => {
  let vare = await model.getVareUnderGruppe(req,res);
    res.render("backoffice/create", {
      title: "Opret vare",
      alert: "",
      vareundergruppe: vare[0],
    });
};

/* CREATE A VARE */
exports.createVare = async (req, res) => {
  let vare = await model.createAProduct(req,res);
  if(vare){
    res.render("backoffice/create", {
      title: "Opret vare",
      alert: "Vare oprettet!",
    });
  }else{    res.render("backoffice/create", {
    title: "Opret vare",
    alert: "Fejl i at oprettet en Vare!",
  });
  }
};

/* GET UPDATE PAGE */
exports.update = async (req, res) => {
  let vare = await model.getupdateAproduct(req,res);
    res.render("backoffice/update", {
      vare: vare[0][0],
      title: "Opdater vare",
      alert: "",
    });

};

/* UPDATE A VARE */
exports.updateVare = async (req, res) => {
  await model.updateAProduct(req,res);
    // Stay on page after submit
    let vare = await model.getupdateAproduct(req,res);
    res.render("backoffice/update", {
      vare: vare[0][0],
      title: "Opdater vare",
      alert: "Vare opdateret!",
    });

};

/* DELETE A VARE */
exports.deleteVare = async (req, res) => {
  //  let deletevare = await model.deleteAProduct(req,res);
  try {
    let { id } = req.params;
    let sql = "DELETE FROM vare WHERE varenummer = ?";
    await pool.query(sql, [id]);
    res.redirect(`backoffice`);
  } catch (e) {
    console.error(e.message);
  }
};
