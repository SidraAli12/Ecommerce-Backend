const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const {
  addProduct,
  getProducts,
  deleteProduct
} = require('../controllers/productController');

router.post('/', protect, admin, addProduct);

router.get('/', getProducts);

router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;