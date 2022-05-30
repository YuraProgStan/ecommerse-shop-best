const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // const accessToken = req.get(constants.AUTHORIZATION);
    const  accessToken = req.headers.authorization;
    if ( accessToken) {
        const token = accessToken.split(' ')[1];
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) res.status(403).json('Token is not valid');
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json('You are not authenticated!')
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log('perfect')
        if (req.user.id === req.params.id || req.user.isAdmin) {

            next()
        }else {
            res.status(403).json("You ara not allowed to do that! ")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        }else {
            res.status(403).json("You ara not allowed to do that! ")
        }
    })
}
module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}