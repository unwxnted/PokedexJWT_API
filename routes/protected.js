const express = require('express');
const router = express.Router();
const pool = require('../database');
const { verifyToken } = require('./utils');

/*

{
  "id": 1,
  "username": "wknss",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IndrbnNzIiwicGFzc3dvcmQiOiJhZG1pbjEyMyJ9LCJpYXQiOjE2NzE2ODYxMzB9.2RSh_cODiyOzHS8go9CX4fxprUOJcOzDMGM3yEIWVN0"
}

*/


router.get('/api/getAll', verifyToken, async (req, res, next) => {

    const pokemons = await pool.query('SELECT * FROM pokemons');
    res.json(pokemons);

});





module.exports = router;