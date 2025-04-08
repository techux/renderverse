const Product = require("../models/product.model");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      status: "ok",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, image, liveLink } = req.body;

    if (!name || !description || !image || !liveLink) {
      return res.status(400).json({
        status: "error",
        message:
          "All fields (name, description, image, liveLink) are required.",
      });
    }

    const newProduct = new Product({
      name,
      description,
      image,
      liveLink,
    });

    await newProduct.save();

    return res.status(201).json({
      status: "ok",
      message: "Product created successfully.",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        status: "error",
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      status: "ok",
      message: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        status: "error",
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      status: "ok",
      message: "Product deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
