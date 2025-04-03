const express = require("express");
const {
  handleCreateProducts,
  handleGetAllProducts,
  handleGetProductsById,
  handleUpdateProducts,
  handleDeleteProduct,
} = require("../Controllers/productController");

const router = express.Router();

router.post("/", handleCreateProducts);
router.get("/", handleGetAllProducts);
router.get("/:id", handleGetProductsById);
router.put("/:id", handleUpdateProducts);
router.delete("/:id", handleDeleteProduct);

module.exports = router;