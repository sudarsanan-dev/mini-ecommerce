const express = require('express');
const { getproducts, getSingleProduct } = require('../controllers/productController');
const router = express.Router();
router.route('/').get(getproducts);
router.route('/:id').get(getSingleProduct);
module.exports = router;