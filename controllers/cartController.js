const Cart = require('../models/Cart');

// ADD TO CART
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user });

    if (!cart) {
      cart = await Cart.create({
        user: req.user,
        products: [{ product: productId, quantity }]
      });
    } else {
      const productIndex = cart.products.findIndex(
        p => p.product.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
    }

    res.json(cart);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET CART
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user }).populate('products.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// REMOVE FROM CART
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user });

    cart.products = cart.products.filter(
      p => p.product.toString() !== productId
    );

    await cart.save();

    res.json(cart);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};