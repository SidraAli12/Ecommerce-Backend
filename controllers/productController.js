const Product = require('../models/product');


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


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};