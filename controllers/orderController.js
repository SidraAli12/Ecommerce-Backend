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

// GET ALL ORDERS (ADMIN)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email');

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


// MARK ORDER DELIVERED
exports.markOrderDelivered = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    await order.save();

    res.json({
      message: "Order delivered",
      order
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};