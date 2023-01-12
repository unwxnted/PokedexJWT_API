const express = require('express');
const router = express();
const {signinController, signupController} = require('../controllers/users.controller');


router.post('/signup', signupController);
router.post('/signin', signinController);


module.exports = router;