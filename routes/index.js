const express = require("express");
const router = express.Router();
const passport = require("passport");
const indexController = require("../controllers/indexController");
const backofficeController = require("../controllers/backofficeController");
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});

// Use indexController.isLoggedIn FIRST, on relevant routes, to force login

/* LOGIN ROUTES */
router
  .route("/login")
  .get(indexController.login)
  .post(
    // Passport settings
    passport.authenticate("local-login", {
      successRedirect: "/velkommen", // Redirect on success
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
router.route("/velkommen").get(indexController.isLoggedIn,indexController.velkommen);

/* SCAN VARE */
router.route("/scanvare").get(indexController.isLoggedIn,indexController.scanvare);

/* SCAN VARE VARENUMMER*/
router.route("/scanvare/:varenummer").get(indexController.isLoggedIn,indexController.scanvarenummer);

/* KATEGORIER */
router.route("/kategorier").get(indexController.isLoggedIn,indexController.kategorier);

/* MALING */
router.route("/maling").get(indexController.isLoggedIn,indexController.maling);

/* PENSLER */
router.route("/vaegmaling").get(indexController.isLoggedIn,indexController.vaegmaling);

/* VEJLEDNING */
router.route("/vejledning").get(indexController.isLoggedIn,indexController.vejledning);

/* INDKØBSKURV */
router.route("/kurv").get(indexController.isLoggedIn,indexController.kurv);

/* NAVIGERING */
router.route("/produkt_navigering").get(indexController.isLoggedIn,indexController.produkt_navigering);

/* KVITTERINGER */
router.route("/kvitteringer").get(indexController.isLoggedIn,indexController.kvitteringer);

/* KVITTERINGER UDVIDET */
router.route("/kvitteringer_udvidet").get(indexController.isLoggedIn,indexController.kvitteringer_udvidet);

/* PRODUKT */
router.route("/produkt/:varenummer").get(indexController.isLoggedIn,indexController.produkt);

/* PRODUKT REDIRECT */
router.route("/produkt").get(indexController.isLoggedIn,indexController.produkt_redirect);

/* INDKØBSLISTE REDIRECT */

router.route("/liste").get(indexController.isLoggedIn,indexController.liste);

/* HJÆLP FUNKTION */
router.route("/hjaelp").post(indexController.hjaelp);

/* BACKOFFICE ROUTES */
router
  .route("/backoffice")
  .get(backofficeController.backoffice)
  .post(backofficeController.backofficeSearch);

router
  .route("/backoffice/create")
  .get(backofficeController.create)
  .post(upload.single('billede'), backofficeController.createVare);

router
  .route("/backoffice/update/:id")
  .get(backofficeController.update)
  .post(upload.single('billede'), backofficeController.updateVare);

router.route("/backoffice/delete/:id").get(backofficeController.deleteVare);

module.exports = router;
