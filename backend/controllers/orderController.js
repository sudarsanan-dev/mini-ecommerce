const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');

// Create order - /api/v1/order 
exports.createOrder = async (req, res, next) => {

    const cartItems = req.body.cartItems;

    const amount = Number(
        cartItems.reduce((acc, item) => 
            acc + item.products.price * item.qty, 0)
    ).toFixed(2);

    const status = 'pending';

    const order = await orderModel.create({ cartItems, amount, status });
    // Updating Product Stock
    cartItems.forEach(async (item) => {
       const product =  await productModel.findById(item.products._id);
       product.stock = product.stock - item.qty;
       await product.save();
    });

    res.json({
        success: true,
        order
    });
}