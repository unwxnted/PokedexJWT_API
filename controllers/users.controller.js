const jwt = require('jsonwebtoken');
const pool = require('../database');
const { secret } = require('../keys.js');
const { encryptPassword, matchPassword } = require('../lib/utils');

const signupController = async (req, res) => {

    const user = {
        id: req.body.userId,
        username: req.body.username,
        password: req.body.password
    };

    if (!req.body.userId || !req.body.username || !req.body.password) return res.status(400).json({ message: 'Missing data' });

    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [user.username]);
    if (rows.length > 0 && rows) return res.status(400).json({ Error: 'User already exists' });

    const token = jwt.sign({ user }, secret);

    user.password = await encryptPassword(user.password);

    user.token = token;

    await pool.query('INSERT INTO users SET ?', [user]);

    return res.json({
        id: user.id,
        username: user.username,
        token: token
    });

};

const signinController = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ Error: 'Missing credentials' });

    const rows = await pool.query('SELECT * FROM users WHERE username =?', [username]);

    if (rows.length === 0) return res.status(404).json({ Error: 'User not found' });

    const validPassword = await matchPassword(password, rows[0].password);

    if (!validPassword) return res.status(400).json({ Error: 'Invalid credentials' });

    return res.status(200).json({ username: username, token: rows[0].token });

};

module.exports = {
    signupController,
    signinController
};