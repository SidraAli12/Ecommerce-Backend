const Order = require('../models/order');
const Cart = require('../models/Cart');

// PLACE ORDER
exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user }).populate('products.product');

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;

    cart.products.forEach(item => {
      total += item.product.price * item.quantity;
    });


    const order = await Order.create({
      user: req.user,
      orderItems: cart.products.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      totalPrice: total
    });

    
    cart.products = [];
    await cart.save();

    res.json(order);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET MY ORDERS
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user }).populate('orderItems.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};