const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const bodyParser = require('body-parser');
const MySQLStore = require('express-mysql-session')(session);
const { database } = require('./keys');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes/protected'));
app.use(require('./routes/unprotected'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
