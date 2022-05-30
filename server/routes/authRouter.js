const {Router} = require('express');
const UserModel = require('../models/UserModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const router = Router();

//REGISTER
router.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const saveUser = await UserModel.create({...req.body, password: hashPassword});
        res.status(201).json(saveUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    try {

        const user = await UserModel.findOne({username: req.body.username});
        console.log(user);
        if (!user) {
            res.status(401).json({message: 'Wrong Credentials'});
            return;
        }
        bcrypt.compare(req.body.password, user.password, function (err, response) {
            if (response) {
                const accessToken = jwt.sign(
                    {
                        id: user._id,
                        isAdmin: user.isAdmin
                    },
                    process.env.JWT_KEY,
                    {expiresIn: '1d'}
                )
                const {password, ...others} = user._doc;
                res.status(200).json({...others, accessToken})
            } else {
                res.status(401).json({message: 'Wrong Credentials'})
            }
        });

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;