const model = require("../models/products");

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
  });
};

/* GET SCAN PAGE */
exports.scanvare = (req, res) => {
  res.render("scanvare", {
    title: "Scan en vare",
  });
};

/* GET KATEGORIER PAGE */
exports.kategorier = (req, res) => {
  res.render("kategorier", {
    title: "Kategorier",
    title_bar: "Kategorier",
    arrrow_back: "href=" + "/velkommen",
  });
};

/* GET MALING PAGE */
exports.maling = (req, res) => {
  res.render("maling", {
    title: "Maling",
    title_bar: "Maling",
    arrrow_back: "href=" + "/Kategorier",
  });
};

/* GET VÆGMALING PAGE */
exports.vaegmaling = async (req, res) => {
  let vare = await model.getVare(req, res);
  console.log(vare);
  res.render("vaegmaling", {
    title: "Vægmaling",
    title_bar: "Vægmaling",
    arrrow_back: "href=" + "/maling",
    vare: vare[0][0],
  });
};

/* GET VEJLEDNING PAGE */
exports.vejledning = (req, res) => {
  res.render("vejledning", {
    title: "Vejledning",
    title_bar: "Vægmaling",
    arrrow_back: "href=" + "/velkommen",
  });
};

/* GET HAR DU HUSKET PAGE */
exports.harduhusket = (req, res) => {
  res.render("harduhusket", {
    title: "Har du husket?",
  });
};

/* GET INDKØBSKURV PAGE */
exports.kurv = (req, res) => {
  res.render("kurv", {
    title: "Indkøbskurv",
    title_bar: "Indkøbskurv",
    arrrow_back: "href=" + "/produkt",
  });
};

// ====================== /* kvitteringer  */ ====================== //
exports.kvitteringer = (req, res) => {
  res.render("kvitteringer", {
    title: "Alle kvitteringer",
    title_bar: "Kvitteringer",
    arrrow_back: "href=" + "/profile",
  });
};
// ====================== /* kvitteringer udvidet */ ====================== //
exports.kvitteringer_udvidet = (req, res) => {
  res.render("kvitteringer_udvidet", {
    title: "kvitteringer",
    title_bar: "Kvitteringer",
    arrrow_back: "href=" + "/Kvitteringer",
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
      arrrow_back: "href=" + "/vaegmaling",
      vare: vare[0][0],
      anbefalet: anbefalet[0]
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
    arrrow_back: "href=" + "/produkt",
  });
};

// ====================== /* PRODUCTS */ ====================== //

/* CREATE A PRODUCT */
exports.createProduct = async (req, res) => {
  const newProduct = await model.createAProduct(req, res);
  res.json(newProduct);
};

/* GET ALL PRODUCTS */
exports.getAllProducts = async (req, res) => {
  const products = await model.getAllproducts(req, res);
  console.log(products[0]);
  res.json(products[0]);
};

// /* GET A PRODUCT */
exports.getProduct = async (req, res) => {
  const getproduct = await model.getproduct(req, res);
  console.log(getproduct[0]);
  res.json(getproduct[0]);
};

/* UPDATE A PRODUCT */
exports.updateProduct = async (req, res) => {
  const updateProduct = await model.updateAProduct(req, res);
  res.json(updateProduct);
};

/* DELETE A PRODUCT */
exports.deleteProduct = async (req, res) => {
  const deleteproduct = await model.deleteAProduct(req, res);
  if (deleteproduct) {
    console.log("Product deleted!");
    res.json("Product deleted!");
  } else {
    console.log("Product not deleted!");
    res.json("product not deleted!");
  }
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
    arrrow_back: "href=" + "/login",
  });
};

/* PROFILE */
exports.profile = (req, res) => {
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
