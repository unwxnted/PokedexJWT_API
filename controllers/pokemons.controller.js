const pool = require('../database');
const { verifyToken, getTokenFromHeader, getUserFromToken } = require('../lib/utils');

const getAllController = async (req, res, next) => {

    const token = await getTokenFromHeader(req.headers);
    const id_user = await getUserFromToken(token);

    const pokemons = await pool.query('SELECT * FROM pokemons WHERE userId = ?', [id_user]);
    res.status(200).json(pokemons);

};


const getByIdController = async (req, res, next) => {

    const { id } = req.params;

    const token = await getTokenFromHeader(req.headers);
    const id_user = await getUserFromToken(token);

    const pokemon = await pool.query('SELECT * FROM pokemons WHERE id = ? AND userId = ?', [id, id_user]);

    if (pokemon.length > 0) return res.json(pokemon);


    return res.status(404).json({ message: 'Pokemon not found' });

};

const getByNameController = async (req, res, next) => {

    const { name } = req.params;

    const token = await getTokenFromHeader(req.headers);
    const id_user = await getUserFromToken(token);

    const pokemon = await pool.query('SELECT * FROM pokemons WHERE name = ? AND userId = ?', [name, id_user]);

    if (pokemon.length > 0) return res.json(pokemon);

    return res.status(404).json({ message: 'Pokemon not found' });

};

const postController = async (req, res, next) => {

    const { name, type, generation, captured } = req.body;
    const token = await getTokenFromHeader(req.headers);
    const id_user = await getUserFromToken(token);

    const newPokemon = {
        name,
        type,
        generation,
        captured,
        userId: id_user
    };

    await pool.query('INSERT INTO pokemons SET ?', [newPokemon]);

    return res.status(200).json({ message: 'Pokemon saved', pokemon: { name, type, generation, captured, id_user } });

};

const deleteController = async (req, res, next) => {

    const { id } = req.params;
    const token = await getTokenFromHeader(req.headers);
    const id_user = await getUserFromToken(token);

    let deletedPokemon = await pool.query('DELETE FROM pokemons WHERE id =? AND userId = ?', [id, id_user]);
    deletedPokemon = (JSON.parse(JSON.stringify(deletedPokemon))).affectedRows;

    if (deletedPokemon < 1) {
        return res.status(404).json({ message: 'Pokemon not found' });
    }

    return res.status(204);
};


const editController = async (req, res, next) => {

    const { id } = req.params;
    const { name, type, generation, captured } = req.body;
    const token = await getTokenFromHeader(req.headers);
    const id_user = await getUserFromToken(token);

    const pokemon = await pool.query('SELECT * FROM pokemons WHERE id= ? AND userId = ?', [id, id_user]);

    if (pokemon.length < 1) return res.status(404).json({ message: "Pokemon not found" });

    const UpdatedPokemon = {
        name,
        type,
        generation,
        captured,
        userId: id_user
    };

    await pool.query('UPDATE pokemons SET ?  WHERE id = ? AND userID = ?', [UpdatedPokemon, id, id_user]);


    res.status(200).json({ message: "Pokemon Updated", Pokemon: UpdatedPokemon });

};

module.exports = {
    getAllController,
    getByIdController,
    getByNameController,
    postController,
    deleteController,
    editController
};