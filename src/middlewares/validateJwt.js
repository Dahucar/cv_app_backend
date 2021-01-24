
const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    // x-token: headers
    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'You need a token!'
        });
    }

    // verify token header
    try {
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SED );
        req.uid = uid;
        req.name = name;
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Error. Your session has expired!'
        });
    }

    next();
}

module.exports = {
    validateJWT
}