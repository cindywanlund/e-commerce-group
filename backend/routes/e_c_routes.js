const express = require('express')
const {verifySession} = require('../middleware/authorizer')

const router = express.Router()

const { getProducts, setProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { login, logout, getUsers, setUser, updateUser, deleteUser } = require('../controllers/userController');
const { getOrders, setOrder, updateOrder, deleteOrder } = require('../controllers/orderController');

router.route('/product').get(getProducts).post(verifySession,setProduct);
router.route('/product/:id').put(verifySession,updateProduct).delete(verifySession,deleteProduct);

router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/user').get(verifySession,getUsers).post(setUser);
router.route('/user/:id').put(verifySession,updateUser).delete(verifySession,deleteUser);

router.route('/order').get(verifySession,getOrders).post(verifySession,setOrder);
router.route('/order/:id').put(verifySession,updateOrder).delete(verifySession,deleteOrder);

module.exports=router