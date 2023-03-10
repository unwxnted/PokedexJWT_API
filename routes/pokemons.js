const express = require('express');
const router = express();
const { verifyToken } = require('../lib/utils');
const {
    getAllController,
    getByIdController,
    getByNameController,
    postController,
    deleteController,
    editController
} = require('../controllers/pokemons.controller.js');

router.use(express.json());

router.get('/getAll', verifyToken, getAllController);

router.get('/getByid/:id', verifyToken, getByIdController);

router.get('/getByName/:name', verifyToken, getByNameController);

router.post('/post', verifyToken, postController);

router.delete('/delete/:id', verifyToken, deleteController);

router.post('/edit/:id', verifyToken, editController);

module.exports = router;