const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const bodyParser = require('body-parser');
const MySQLStore = require('express-mysql-session')(session);
const { database, secret } = require('./keys');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', require('./routes/pokemons'));
app.use('/api' ,require('./routes/users'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
