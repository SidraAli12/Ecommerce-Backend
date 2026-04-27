const Product = require('../models/product');

// ADD PRODUCT
exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, image, category } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      image,
      category
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE PRODUCT
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};