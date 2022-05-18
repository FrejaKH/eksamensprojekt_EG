const express = require("express");
const router = express.Router();
const passport = require("passport");
const indexController = require("../controllers/indexController");

// Use indexController.isLoggedIn FIRST, on relevant routes, to force login

/* GENERAL ROUTES */
router.route("/").get(indexController.index);

/* PRODUCT ROUTES */
router
  .route("/products")
  .post(indexController.createProduct)
  .get(indexController.getAllProducts);

router
  .route("/products/:id")
  .get(indexController.getProduct)
  .put(indexController.updateProduct)
  .delete(indexController.deleteProduct);

/* LOGIN ROUTES */
router
  .route("/login")
  .get(indexController.login)
  .post(
    // Passport settings
    passport.authenticate("local-login", {
      successRedirect: "/profile", // Redirect on success
      failureRedirect: "/login", // Redirect back to login if error
      failureFlash: true, // Allow flash messages
    }),
    indexController.loginSuccess
  );

/* SIGNUP ROUTES */
router
  .route("/signup")
  .get(indexController.signup)
  .post(
    // Passport settings
    passport.authenticate("local-signup", {
      successRedirect: "/login", // Redirect on success
      failureRedirect: "/signup", // Redirect back to signup if error
      failureFlash: true, // Allow flash messages
    })
  );

/* PROFILE ROUTES */
router
  .route("/profile")
  .get(indexController.isLoggedIn, indexController.profile); // indexController.isLoggedIn FIRST, to check if logged in

/* LOGOUT ROUTES */
router.route("/logout").get(indexController.logout); // Drop session

/* VELKOMMEN */
router.route("/velkommen").get(indexController.velkommen);

/* KATEGORIER */
router.route("/kategorier").get(indexController.kategorier);

/* MALING */
router.route("/maling").get(indexController.maling);

/* PENSLER */
router.route("/vaegmaling").get(indexController.vaegmaling);

/* VEJLEDNING */
router.route("/vejledning").get(indexController.vejledning);

/* HAR DU HUSKET */
router.route("/harduhusket").get(indexController.harduhusket);

/* INDKØBSKURV */
router.route("/kurv").get(indexController.kurv);

/* NAVIGERING */
router.route("/produkt_navigering").get(indexController.produkt_navigering);
/* KVITTERINGER */
router.route("/kvitteringer").get(indexController.kvitteringer);
/* KVITTERINGER UDVIDET */
router.route("/kvitteringer_udvidet").get(indexController.kvitteringer_udvidet);
/* PRODUKT */
router.route("/produkt").get(indexController.produkt);
/* BILLEDE */
router.route("/image/:varenummer").get(indexController.getImage);

module.exports = router;
