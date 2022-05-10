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
    title: "test",
  });
};

// ====================== /* PRODUCTS */ ====================== //

/* CREATE A PRODUCT */
exports.createProduct = async (req, res) => {
  try {
    const { beskrivelse } = req.body;
    const newProduct = await pool.query(
      "INSERT INTO vare (beskrivelse) VALUES (?)",
      [beskrivelse]
    );
    console.log(req.body);
    res.json(newProduct);
  } catch (err) {
    console.error(err.message);
  }
};

/* GET ALL PRODUCTS */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await product.getAllproduct(req, res);
    console.log(products[0]);
    res.json(products[0]);
    // res.render("index", { products: products[0] });
  } catch (err) {
    console.error(err.message);
  }
};
/* GET A PRODUCT */
// exports.getProduct = async (req, res) => {
//   try {
//     // console.log(req.params.id);
//     const { varenummer } = req.params;
//     const product = await pool.query(
//       "SELECT * FROM vare WHERE varenummer = ?",
//       [varenummer]
//     );
//     console.log(product[0]);
//     res.json(product[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// /* GET A PRODUCT */
exports.getProduct = async (req, res) => {
  try {
    const varenummer = req.params.id;
    console.log(varenummer);
    const getproduct = await product.getproduct(req, res);
    // const varenummer = req.params;
    // console.log(varenummer);
    // const product = await pool.query(
    //   "SELECT * FROM vare WHERE varenummer = ?",
    //   [varenummer]
    // );
    console.log(getproduct[0]);
    res.json(getproduct[0]);
  } catch (err) {
    console.error(err.message);
  }
};

/* UPDATE A PRODUCT */
exports.updateProduct = async (req, res) => {
  try {
    const { varenummer } = req.params;
    const { description } = req.body;
    const updateProduct = await pool.query(
      "UPDATE vare SET description = ? WHERE varenummer = ?",
      [description, varenummer]
    );
    console.log("Product updated!");
    res.json("Product updated!");
  } catch (err) {
    console.error(err.message);
  }
};

/* DELETE A PRODUCT */
exports.deleteProduct = async (req, res) => {
  try {
    const { varenummer } = req.params;
    const deleteProduct = await pool.query(
      "DELETE FROM vare WHERE varenummer = ?",
      [varenummer]
    );
    console.log("Product deleted!");
    res.json("Product deleted!");
  } catch (err) {
    console.error(err.message);
  }
};

// ====================== /* PASSPORT */ ====================== //

/* LOGIN */
exports.login = (req, res) => {
  res.render("login", { message: req.flash("loginMessage") });
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
  res.render("signup", { message: req.flash("signupMessage") });
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
