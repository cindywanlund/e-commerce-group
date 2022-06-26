const asyncHandler = require('express-async-handler')

const Order = require('../models/orderModel')
const e_mailer = require('../middleware/mailFunction');


// @desc  Get entries for all orders
// @route GET /api/order
// @access Private

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
    res.status(200).json(orders)

})

// @desc  Set a order entry
// @route POST /api/order
// @access Private
const setOrder = asyncHandler(async (req, res) => {

    const emailInfo={
        subject:"Order creation",
        from: "Order Management",
        to: req.session.user.email
    }

    if (!req.body.quantity) {
        e_mailer.sendMail(emailInfo,"Quantity of order should be specified. No order created");
        throw new Error('Quantity of order should be specified');
    }

    let order = await Order.create({
        quantity: req.body.quantity,
        product: req.body.productId,
        user: req.body.userId,
        status: req.body.status
    })

    console.log("Logged in user: "+ req.session.user.email);

    info = e_mailer.sendMail(emailInfo,"Order created successfully...");
    res.status(200).json(order);
})

// @desc  Update a order entry
// @route PUT /api/order/:id
// @access Private
const updateOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        res.status(400);
        throw new Error('No order found.');
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedOrder)
})

// @desc  DELETE a order entry
// @route DELETE /api/order/:id
// @access Private
// The order will be deleted and an email wil be sent
const deleteOrder = asyncHandler(async (req, res) => {

    const emailInfo={
        subject:"Order cancellation",
        from: "Order Management",
        to: req.session.user.email
    }

    const order = await Order.findById(req.params.id)

    if (!order) {
        res.status(400);
        throw new Error('No order found.');
    }
    await order.remove();

    e_mailer.sendMail(emailInfo,req.body.cancelationMessage);
    res.status(200).json({id: req.params.id});
})

module.exports = {
    getOrders, setOrder, updateOrder, deleteOrder
}