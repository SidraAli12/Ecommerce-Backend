const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware'); 

const {
  addToCart,
  getCart,
  removeFromCart,
  updateFromCart
} = require('../controllers/cartController');

router.post('/', protect, addToCart);
router.get('/', protect, getCart);
router.delete('/', protect, removeFromCart);
router.put('/', protect, updateFromCart);


module.exports = router;