const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secret} = require('../keys.js')
const pool = require('../database');

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

    jwt.verify(req.token, secret, (err, authData) => {

        if (!err) return next();


        return res.status(403).json({
            "Eror 403": "Token not valid"
        });
    });

}

helpers.matchPassword = async (password, savedPasword) =>{

    try{
        return await bcrypt.compare(password, savedPasword);
    }catch(e){
        console.log(e)
    }
    
};

helpers.getTokenFromHeader = async (headers) => {

    return (headers['authorization'].split(' '))[1];

};

helpers.getUserFromToken = async (token) => {
    const id = await pool.query('SELECT id FROM users WHERE token = ?', [token]);
    return await JSON.parse(JSON.stringify(id))[0].id;
};

module.exports = helpers;