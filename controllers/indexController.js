const model = require("../models/products");
const modelBrugere = require("../models/brugere");


// ====================== /* MISC. */ ====================== //

/* CHECK IF LOGGED IN - Use indexController.isLoggedIn FIRST, on relevant routes, to force login */
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next(); // If user is authenticated in the session, carry on
  res.redirect("/login"); // if false, redirect to login
};

/* GET INDEX PAGE */
exports.index = (req, res) => {
  res.render("index", {
    title: "Velkommen",
  });
};

/* GET INDSTILLINGER PAGE */
exports.indstillinger = (req, res) => {
  res.render("Indstillinger", {
    title: "Indstillinger",
    user: req.user,
  });
};

/* GET VELKOMMEN PAGE */
exports.velkommen = (req, res) => {
  res.render("velkommen", {
    title: "Velkommen",
    title_bar: "Velkommen",
    user: req.user,

  });
  console.log(req.url, req.method);
};

/* GET SCAN PAGE */
exports.scanvare = (req, res) => {
  res.render("scanvare", {
    title: "Scan en vare",
    user: req.user,
  });
};

/* GET SCAN PAGE WITH PRODUCT */
exports.scanvarenummer = async (req, res) => {
  let vare = await model.getproduct(req, res);
  let anbefalet = await model.getAssociatedProducts(req, res);
  res.render("scanvare", {
    title: "Scan en vare",
    vare: vare[0][0],
    anbefalet: anbefalet[0],
    user: req.user,

  });
};

/* GET KATEGORIER PAGE */
exports.kategorier = (req, res) => {
  res.render("kategorier", {
    title: "Kategorier",
    title_bar: "Kategorier",
    arrow_back: "href=" + "/velkommen",
    user: req.user,

  });
};

/* GET MALING PAGE */
exports.maling = (req, res) => {
  res.render("maling", {
    title: "Maling",
    title_bar: "Maling",
    arrow_back: "href=" + "/Kategorier",
    user: req.user,

  });
};

/* GET VÆGMALING PAGE */
exports.vaegmaling = async (req, res) => {
  let vare = await model.getVare(req, res);
  console.log(vare);
  res.render("vaegmaling", {
    title: "Vægmaling",
    title_bar: "Vægmaling",
    arrow_back: "href=" + "/maling",
    vare: vare[0],
    user: req.user,

  });
};

/* GET VEJLEDNING PAGE */
exports.vejledning = (req, res) => {
  res.render("vejledning", {
    title: "Vejledning",
    title_bar: "Vægmaling",
    arrow_back: "href=" + "/velkommen",
    user: req.user,

  });
};

/* GET INDKØBSKURV PAGE */
exports.kurv = async (req, res) => {
  let produkter = await model.getAllproducts(req, res);
  console.log(produkter);
  res.render("kurv", {
    title: "Indkøbskurv",
    title_bar: "Indkøbskurv",
    arrow_back: "href=" + "/produkt",
    produkter: produkter[0],
    user: req.user,
  });
};
/* GET INDKØBSLISTE PAGE */
exports.liste = (req, res) => {
  res.render("liste", {
    title: "indkøbsliste",
    title_bar: "indkøbsliste",
    arrow_back: "href=" + "/produkt",
    user: req.user,


  });
};

// ====================== /* kvitteringer  */ ====================== //
exports.kvitteringer = (req, res) => {
  res.render("kvitteringer", {
    title: "Alle kvitteringer",
    title_bar: "Kvitteringer",
    arrow_back: "href=" + "/profile",
    user: req.user,

  });
};
// ====================== /* kvitteringer udvidet */ ====================== //
exports.kvitteringer_udvidet = (req, res) => {
  res.render("kvitteringer_udvidet", {
    title: "kvitteringer",
    title_bar: "Kvitteringer",
    arrow_back: "href=" + "/Kvitteringer",
    user: req.user,

  });
};
// ====================== /* produkt indformationer  */ ====================== //
exports.produkt = async (req, res) => {
  try {
    let vare = await model.getproduct(req, res);
    let anbefalet = await model.getAssociatedProducts(req, res);
    res.render("produkt", {
      title: "Produktbeskrivelse",
      title_bar: "Produkt",
      arrow_back: "href=" + "/vaegmaling",
      vare: vare[0][0],
      anbefalet: anbefalet[0],
      user: req.user,

    });
  } catch (e) {
    console.log(e);
  }
};

exports.produkt_redirect = async (req, res) => {
  res.redirect("kategorier");
};

// ====================== /* Navigering til produkt */ ====================== //
/* GET navigering til produkt PAGE */
exports.produkt_navigering = (req, res) => {
  res.render("produkt_navigering", {
    title: "Navigering",
    title_bar: "Oversigt",
    arrow_back: "href=" + "/produkt",
    user: req.user,

  });
};

// ====================== /* PASSPORT */ ====================== //

/* LOGIN */
exports.login = (req, res) => {
  res.render("login", { message: req.flash("loginMessage"), title: "Login" });
};

exports.loginSuccess = (req, res) => {
  if (req.body.remember) {
    req.session.cookie.maxAge = 60 * 60 * 24; // 86400 seconds = 1 day
  } else {
    req.session.cookie.expires = false;
  }
  res.redirect("/");
};

/* SIGNUP */
exports.signup = (req, res) => {
  res.render("signup", {
    message: req.flash("signupMessage"),
    title: "Opret bruger",
    title_bar: "Opret bruger",
    arrow_back: "href=" + "/login",
  });
};

/* PROFILE */
exports.profile = (req, res) => {
  res.render("profile", {
    user: req.user,
    title: "Profil",
  });
};
/* PROFILE */
exports.hjaelp = async(req, res) => {
  const bool = await modelBrugere.updatehjaelp(req,res);
  req.user.hjaelp = bool;
  res.render("profile", {
    user: req.user,
    title: "Profil",
  });
};

/* LOGOUT */
exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
