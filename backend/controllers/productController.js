const ProductModel = require('../models/productModel');

// Get products Api - /api/v1/products 
exports.getproducts = async (req, res, next) => {
    const query = req.query.keyword?{name:{
        $regex:req.query.keyword,
        $options:'i'
    }}:{};
    const products = await ProductModel.find(query);
    res.json({
        success: true,
        products
    })

}

// Get Single Product Api - /api/v1/product/:id 

exports.getSingleProduct = async (req, res, next) => {
    try{
        const id = req.params.id;
        const product = await ProductModel.findOne({_id:id});
        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            success:false,
            message:'Unable to get the product with id'
        });
    }
    

    // console.log(req.params._id,'ID')
    // const product = await ProductModel.findOne({_id :req.params.id});
    // res.json({
    //     test:"new code",
    //     id:req.params.id
    // })
};