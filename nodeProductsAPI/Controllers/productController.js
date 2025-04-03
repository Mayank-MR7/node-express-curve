const Product = require("../models/Product");

const handleCreateProducts = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const handleGetAllProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.catergory) {
      filter.catergory = req.query.catergory;
    }
    if (req.query.inStock) {
      filter.inStock = req.query.inStock === "true";
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const handleGetProductsById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: true,
        error: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const handleUpdateProducts = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(500).json({
        success: false,
        error: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: product,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const handleDeleteProduct = async (req, res) => {
  try {
    const products = await Product.findByIdAndDelete(req.params.id);
    if (!products) {
      res.status(500).json({
        success: false,
        error: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: products,
      message: "Product deleted successfully",
    });
  } catch (error) {}
};

module.exports = {
  handleCreateProducts,
  handleGetAllProducts,
  handleGetProductsById,
  handleUpdateProducts,
  handleDeleteProduct,
};
