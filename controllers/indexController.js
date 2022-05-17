const pool = require("../models/db");
const product = require("../models/products");

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

/* GET VELKOMMEN PAGE */
exports.velkommen = (req, res) => {
  res.render("velkommen", {
    title: "Velkommen",
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
    title_bar: "Kategorier",
    arrrow_back: "href=" + "/Kategorier",
  });
};

/* GET VÆGMALING PAGE */
exports.vaegmaling = (req, res) => {
  res.render("vaegmaling", {
    title: "Vægmaling",
    title_bar: "Vægmaling",
    arrrow_back: "href=" + "/maling",
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
    title_bar: "hello",
  });
};
// ====================== /* produkt indformationer  */ ====================== //
exports.produkt = (req, res) => {
  res.render("produkt", {
    title: "produktbeskrivelse",
    title_bar: "Produkt",
    arrrow_back: "href=" + "/vaegmaling",

  });
};
// ====================== /* Navigering til produkt */ ====================== //
/* GET navigering til produkt PAGE */
exports.produkt_navigering = (req, res) => {
  res.render("produkt_navigering", {
    title: "Navigering",
    title_bar: "Oversigt",
    arrrow_back: "href=" + "/produkt",

  })
}
// ====================== /* PRODUCTS */ ====================== //

/* CREATE A PRODUCT */
exports.createProduct = async (req, res) => {
  const newProduct = await product.createAProduct(req, res);
  res.json(newProduct);
};

/* GET ALL PRODUCTS */
exports.getAllProducts = async (req, res) => {
  const products = await product.getAllproduct(req, res);
  console.log(products[0]);
  res.json(products[0]);
};

// /* GET A PRODUCT */
exports.getProduct = async (req, res) => {
  const getproduct = await product.getproduct(req, res);
  console.log(getproduct[0]);
  res.json(getproduct[0]);
};

/* UPDATE A PRODUCT */
exports.updateProduct = async (req, res) => {
  const updateProduct = await product.updateAProduct(req, res);
  res.json(updateProduct);
};

/* DELETE A PRODUCT */
exports.deleteProduct = async (req, res) => {
  const deleteproduct = await product.deleteAProduct(req, res);
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
  });
};

/* LOGOUT */
exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
