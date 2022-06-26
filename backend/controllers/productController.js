const asyncHandler = require('express-async-handler')

const Product = require('../models/productModel')
const jwt = require('jsonwebtoken')

// @desc  Get entries for all products
// @route GET /api/products
// @access Private
const getProducts = asyncHandler(async (req, res) => { // async is used since mongoose is sending back a promise
    const products = await Product.find()
    res.status(200).json(products)

})

// @desc  Set a product entry
// @route POST /api/products
// @access Private
const setProduct = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        throw new Error('Product name should be specified');
    }
    const product = await Product.create({
        name: req.body.name,
        assortment: req.body.assortment
    })
    res.status(200).json(product)
})

// @desc  Update a product entry
// @route PUT /api/products/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(400);
        throw new Error('No product found.');
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedProduct)
})

// @desc  DELETE a product entry
// @route DELETE /api/products/:id
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(400);
        throw new Error('No product found.');
    }
    await product.remove();
    res.status(200).json({id: req.params.id});
})

module.exports = {
    getProducts, setProduct, updateProduct, deleteProduct
}