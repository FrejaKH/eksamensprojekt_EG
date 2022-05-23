const express = require("express");
const router = express.Router();
const passport = require("passport");
const indexController = require("../controllers/indexController");
const backofficeController = require("../controllers/backofficeController");

// Use indexController.isLoggedIn FIRST, on relevant routes, to force login

/* PRODUCT ROUTES */
// router
//   .route("/products")
//   .post(indexController.createProduct)
//   .get(indexController.getAllProducts);

// router
//   .route("/products/:id")
//   .get(indexController.getProduct)
//   .put(indexController.updateProduct)
//   .delete(indexController.deleteProduct);

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

/* INDSTILLINGER */
router
  .route("/indstillinger")
  .get(indexController.isLoggedIn, indexController.indstillinger);

/* INDEX */
router.route("/").get(indexController.index);

/* VELKOMMEN */
router.route("/velkommen").get(indexController.velkommen);

/* SCAN VARE */
router.route("/scanvare").get(indexController.scanvare);

/* SCAN VARE VARENUMMER*/
router.route("/scanvare/:varenummer").get(indexController.scanvarenummer);

/* KATEGORIER */
router.route("/kategorier").get(indexController.kategorier);

/* MALING */
router.route("/maling").get(indexController.maling);

/* PENSLER */
router.route("/vaegmaling").get(indexController.vaegmaling);

/* VEJLEDNING */
router.route("/vejledning").get(indexController.vejledning);

/* INDKØBSKURV */
router.route("/kurv").get(indexController.kurv);

/* NAVIGERING */
router.route("/produkt_navigering").get(indexController.produkt_navigering);

/* KVITTERINGER */
router.route("/kvitteringer").get(indexController.kvitteringer);

/* KVITTERINGER UDVIDET */
router.route("/kvitteringer_udvidet").get(indexController.kvitteringer_udvidet);

/* PRODUKT */
router.route("/produkt/:varenummer").get(indexController.produkt);

/* PRODUKT REDIRECT */
router.route("/produkt").get(indexController.produkt_redirect);

/* INDKØBSLISTE REDIRECT */
router.route("/liste").get(indexController.liste);

/* BACKOFFICE ROUTES */
router
  .route("/backoffice")
  .get(backofficeController.backoffice)
  .post(backofficeController.backofficeSearch);

router
  .route("/backoffice/create")
  .get(backofficeController.create)
  .post(backofficeController.createVare);

router
  .route("/backoffice/update/:id")
  .get(backofficeController.update)
  .post(backofficeController.updateVare);

router.route("/:id").get(backofficeController.deleteVare);

module.exports = router;
