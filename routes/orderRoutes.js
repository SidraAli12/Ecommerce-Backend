const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  markOrderDelivered
} = require('../controllers/orderController');

router.post('/', protect, placeOrder);
router.get('/', protect, getMyOrders);

router.get('/all', protect, admin, getAllOrders);
router.put('/:id/deliver', protect, admin, markOrderDelivered);

module.exports = router;