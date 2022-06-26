const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const bcrypt = require("bcryptjs");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// @desc  login asynch and receive a token
// @route GET /api/login
// @access Private
const login = asyncHandler(async (req, res) => { // async is used since mongoose is sending back a promise

    // check if the user already is logged in
    const oldUser = req.session.user;
    if (oldUser) {
        res.status(403).json({message: 'Already logged in.'});
        return;
    }

    const {email, pwd} = req.body;

    const user = await User.findOne({email});
    if (!user) {
        res.status(403).json({message: 'User not found'});
        return;
    }
    const samePwd = await bcrypt.compare(pwd, user.pwd);

    if (!samePwd) {
        res.status(403).json({message: 'Wrong pwd'});
        return;
    }

    req.session.user = user;
    res.status(200).json({message: user});
});

// @desc  login asynch and receive a token
// @route GET /api/logout
// @access Private
const logout = asyncHandler(async (req, res) => { // async is used since mongoose is sending back a promise

        // check if the user already is logged in
        const oldUser = req.session.user;
        if (!oldUser) {
            res.status(403).json({message: 'No body logged in yet.'});
        } else {

            req.session.user = null;
            req.session.token = null;
            res.status(200).json({message: 'Logged out'});
        }
    })
;


// @desc  Get entries for all products
// @route GET /api/products
// @access Private
const getUsers = asyncHandler(async (req, res) => { // async is used since mongoose is sending back a promise
    const users = await User.find()
    res.status(200).json(users)
})

// @desc  Set a user entry
// @route POST /api/users
// @access Private
const setUser = asyncHandler(async (req, res) => {
    if (!req.body.username) {
        throw new Error('User name should be specified');
    }
    if (!req.body.pwd) {
        throw new Error('Pwd  should be specified');
    }
    if (!req.body.email) {
        throw new Error('Email should be specified');
    }
    const hashedPwd = await bcrypt.hash(req.body.pwd, 12);
    const user = await User.create({
        username: req.body.username,
        pwd: hashedPwd,
        email: req.body.email
    })
    res.status(200).json(user)
})

// @desc  DELETE a product entry
// @route DELETE /api/products/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(400);
        throw new Error('No product found.');
    }
    await user.remove();
    res.status(200).json({id: req.params.id});
})
const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400);
        throw new Error('No user found.');
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedUser)
})

module.exports = {login, logout, getUsers, setUser, deleteUser, updateUser}