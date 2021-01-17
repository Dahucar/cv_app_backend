const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const jwtGenerate = ( uid, name ) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign( payload, process.env.SECRET_JWT_SED, { expiresIn: '2h' }, ( err, token ) => {
            if ( err ) {
                console.log( err );
                reject('Internal error with your token!');
            }
            resolve( token );
        });
    });
}

module.exports = {
    jwtGenerate
}