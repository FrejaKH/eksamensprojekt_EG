const model = require("../models/products");
const pool = require("../models/db");
const { produkt_redirect } = require("./indexController");

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
  let vareundergruppe = await model.getVareUnderGruppe(req,res);
  // console.log(vare[0]);
    res.render("backoffice/create", {
      title: "Opret vare",
      alert: "",
      vare: vareundergruppe[0],
    });
};

/* CREATE A VARE */
exports.createVare = async (req, res) => {
  let vareOprettet = await model.createAProduct(req,res);
  let vare = await model.getVareUnderGruppe(req,res);
  // console.log(vareOprettet);
  if(vareOprettet){
    res.render("backoffice/create", {
      title: "Opret vare",
      alert: "Vare oprettet!",
      vare: vare[0],

    });
  }else{
    res.render("backoffice/create", {
    title: "Opret vare",
    alert_danger: "Fejl i at oprettet en Vare!",
    vare: vare[0],
  });
  }
};

/* GET UPDATE PAGE */
exports.update = async (req, res) => {
  let vare = await model.getupdateAproduct(req,res);
  let vareUndergruppe = await model.getVareUnderGruppe(req,res);

    res.render("backoffice/update", {
      vare: vare[0][0],
      title: "Opdater vare",
      alert: "",
      vareUndergruppe: vareUndergruppe[0],
    });

};

/* UPDATE A VARE */
exports.updateVare = async (req, res) => {
 let newVarenummer = await model.updateAProduct(req,res);
    // Stay on page after submit
    let vare = await model.getNewupdateAproduct(req,res, newVarenummer);
    let vareUndergruppe = await model.getVareUnderGruppe(req,res);

    console.log(vare);
    res.render("backoffice/update", {
      vare: vare[0][0],
      title: "Opdater vare",
      alert: "Vare opdateret!",
      vareUndergruppe: vareUndergruppe[0],
    });

};

/* DELETE A VARE */
exports.deleteVare = async (req, res) => {
    await model.deleteAProduct(req,res);
    res.redirect("/backoffice");
};
