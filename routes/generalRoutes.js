var express = require("express");
var router = express.Router();
const generalController = require("../controllers/generalController");

/* INDEX ROUTES */

router.route("/").get(generalController.index);

/* PRODUCT ROUTES */

router
  .route("/products")
  .post(generalController.createProduct)
  .get(generalController.getAllProducts);

router
  .route("/products/:id")
  .get(generalController.getProduct)
  .put(generalController.updateProduct)
  .delete(generalController.deleteProduct);

module.exports = router;
