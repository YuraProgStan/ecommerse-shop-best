const {Router} = require('express');
const {verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken} = require('../verifyToken');
const bcrypt = require('bcrypt');
const OrderModel = require('../models/OrderModel')

const router = Router();

//CREATE
router.post('/', verifyToken, async (req, res) => {
    try {
        const order = await OrderModel.create(req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
})
//UPDATE
router.patch('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await OrderModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Cart has been deleted');
    } catch (err) {
        res.status(500).json(err)
    }
})
// //GET ALL

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER ORDERS
router.get('/find/:userId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await OrderModel.find({userId: req.params.userId});
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET MONTHLY INCOME
router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid;

    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
    console.log('here')
    try {
        const income = await OrderModel.aggregate([
            {$match: {createdAt: {$gte: previousMonth}, ...(productId && {
                products: {$elemMatch: {productId}}
                    })
            }},
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$amount",
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"}
                }
            }
        ]);
        console.log('income', income);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router