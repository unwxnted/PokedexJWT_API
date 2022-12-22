const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../database');
const { encryptPassword } = require('./utils');


router.post('/api/signup', async (req, res) => {

    const user = {
        id: req.body.userId,
        username: req.body.username,
        password: req.body.password
    };


    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [user.username]);
    if (rows.length > 0 && rows) return res.status(400).json({ Error: 'User already exists' });

    const token = jwt.sign({ user }, 'my_secret_key');

    user.password = await encryptPassword(user.password);

    const result = await pool.query('INSERT INTO users SET ?', [user]);

    return res.json({
        id: user.id,
        username: user.username,
        token: token
    });

});

module.exports = router;