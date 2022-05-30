const {Router} = require('express');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');
const orderRouter = require('./orderRouter');
const stripeRouter = require('./stripeRouter');

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/carts', cartRouter);
router.use('/orders', orderRouter);
router.use('/checkout', stripeRouter);


module.exports = router