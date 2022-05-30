const {Router} = require("express");

const router = Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY)

router.post("/payment", async (req, res) => {
    await stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            idempotencyKey: req.body.idempotencyKey,
            currency: "usd",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );
});

module.exports = router