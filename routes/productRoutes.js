const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct
} = require('../controllers/productController');

router.post('/', protect, admin, addProduct);

router.get('/', getProducts);

router.delete('/:id', protect, admin, deleteProduct);
router.put('/:id', protect, admin, updateProduct);

module.exports = router;