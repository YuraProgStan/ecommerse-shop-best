const {Router} = require('express');
const {verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken} = require('../verifyToken');
const bcrypt = require('bcrypt');
const CartModel = require('../models/CartModel')

const router = Router();

//CREATE
router.post('/', verifyToken, async (req, res) => {
    try {
        const cart = await CartModel.create(req.body);
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
})
//UPDATE
router.patch('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await CartModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await CartModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Cart has been deleted');
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET USER CART
router.get('/find/:userId', verifyTokenAndAuthorization,async (req, res) => {
    try {
        const cart = await CartModel.findOne({userId: req.params.userId});
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL

router.get('/', verifyTokenAndAdmin,async (req, res) => {
try{
    const carts = await CartModel.find();
    res.status(200).json(carts);
}catch (err){
    res.status(500).json(err)
}
})


module.exports = router

