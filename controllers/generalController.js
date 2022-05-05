const pool = require("../models/db");

/* GET INDEX PAGE */
exports.index = (req, res) => {
  res.render("index", {
    title: "test",
  });
};

/* CREATE A PRODUCT */
exports.createProduct = async (req, res) => {
  try {
    const { description } = req.body;
    const newProduct = await pool.query(
      "INSERT INTO testtable (description) VALUES (?)",
      [description]
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
    const products = await pool.query("SELECT * FROM testtable");
    console.log(products[0]);
    res.json(products[0]);
    // res.render("index", { products: products[0] });
  } catch (err) {
    console.error(err.message);
  }
};

/* GET A PRODUCT */
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query("SELECT * FROM testtable WHERE id = ?", [
      id,
    ]);
    console.log(product[0]);
    res.json(product[0]);
  } catch (err) {
    console.error(err.message);
  }
};

/* UPDATE A PRODUCT */
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateProduct = await pool.query(
      "UPDATE testtable SET description = ? WHERE id = ?",
      [description, id]
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
    const { id } = req.params;
    const deleteProduct = await pool.query(
      "DELETE FROM testtable WHERE id = ?",
      [id]
    );
    console.log("Product deleted!");
    res.json("Product deleted!");
  } catch (err) {
    console.error(err.message);
  }
};
