const {Router} = require('express');
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../verifyToken');
const bcrypt = require('bcrypt');
const ProductModel = require('../models/ProductModel')

const router = Router();

//CREATE
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const product = await ProductModel.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
})
//UPDATE
router.patch('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Product has been deleted');
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET PRODUCT
router.get('/find/:id', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL PRODUCTS

router.get('/', async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if(qNew){
            products = await ProductModel.find().sort({createdAt: -1}).limit(5)
        } else if (qCategory){
            products = await ProductModel.find({categories: {
                $in: [qCategory]
                }})
        }else {
            products = await ProductModel.find();
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router

