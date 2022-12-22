const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

helpers = {}

helpers.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}



helpers.verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader === 'undefined') return res.sendStatus(403);

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(req.token, 'my_secret_key', (err, authData) => {

        if (!err) return next();


        return res.sendStatus(403).json({
            "Eror 403": "Token not valid"
        });
    });

}

module.exports = helpers;