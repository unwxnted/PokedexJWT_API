const router = require('../routes/users.js');
const request = require('supertest');

describe('POST signup route', () => {

    it('should return 200 status code and the user json object', async () => {

        const user = {
            'userId': 2,
            'username': 'new user',
            'password': '123newPass'
        };

        const response = await request(router).post('/signup').send(user);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 2);
        expect(response.body).toHaveProperty('username', 'new user');
    });

    it('should return 400 status code', async () => {

        const user = {
            'userId': 1,
            'username': 'new user',
            'password': '123newPass'
        };

        const response = await request(router).post('/signup').send(user);

        expect(response.status).toBe(400);
    });

    it('should return 400 status code', async () => {

        const user = {
            'id': 2,
            'username': 'new user',
            'password': '123newPass'
        };

        const response = await request(router).post('/signup').send(user);

        expect(response.status).toBe(400);
    });

});


describe('POST signin route', () => {

    it('should return 200 status code and the user json object', async () => {

        const user = {
            'username': 'new user',
            'password': '123newPass'
        };

        const response = await request(router).post('/signin').send(user);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', 'new user');
    });

    it('should return 404 status code', async () => {

        const user = {
            'username': 'new user',
            'password': '123newPAss'
        };

        const response = await request(router).post('/signin').send(user);

        expect(response.status).toBe(400);
    });


    it('should return 400 status code', async () => {

        const user = {
            'username': 'new user',
            'password': undefined
        };

        const response = await request(router).post('/signin').send(user);

        expect(response.status).toBe(400);
    });

});