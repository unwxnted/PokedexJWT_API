CREATE DATABASE pokedex_db;

USE pokedex_db;

CREATE TABLE users(
    id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE pokemons(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    generation INT NOT NULL,
    captured TINYINT NOT NULL,
    userId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

INSERT INTO pokemons (name, type, generation, captured, userId) VALUES ('charizard', 'fire', 1, 1, 1);
INSERT INTO pokemons (name, type, generation, captured, userId) VALUES ('Bulbasaur', 'plant', 1, 1, 1);
INSERT INTO pokemons (name, type, generation, captured, userId) VALUES ('charmander', 'fire', 1, 1, 2);