const express = require('express');
const { getproducts } = require('../controllers/productController');
const { createOrder } = require('../controllers/orderController');
const router = express.Router();
router.route('/').post(createOrder);

module.exports = router; 