const router = require('../routes/pokemons.js');
const request = require('supertest');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IndrbnNzIiwicGFzc3dvcmQiOiJhZG1pbjEyMyJ9LCJpYXQiOjE2NzMzMDA0ODZ9.FjNeeTXXF0s_c8DIT0p9Tui8yqfCmX0qrNFSPRX8f4s';

describe('GET pokemons routes', () => {

    // getAll
    it('should return a 200 status and a json file', async () => {
        const response = await request(router).get('/getAll')
            .set('authorization', `Bearer ${token}`)
            .set('content-type', 'application/json');

        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');

    });

    it('should return a 400 status', async () => {
        const response = await request(router).get('/getAll')
            .set('authorization', `Bearer ${token + token}`)
            .set('content-type', 'application/json');

        expect(response.status).toBe(403);
    });

    // getById
    it('should return a 200 status and a json file', async () => {
        const response = await request(router).get('/getById/20')
            .set('authorization', `Bearer ${token}`)
            .set('content-type', 'application/json');

        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');

    });

    it('should return a 404 status', async () => {
        const response = await request(router).get('/getById/-1')
            .set('authorization', `Bearer ${token}`)
            .set('content-type', 'application/json');

        expect(response.status).toBe(404);
    });

    it('should return a 403 status', async () => {
        const response = await request(router).get('/getById/3')
            .set('authorization', `Bearer ${token + token}`)
            .set('content-type', 'application/json');

        expect(response.status).toBe(403);
    });

    // getByName

    it('should return a 200 status and a json file', async () => {
        const response = await request(router).get('/getByName/pikachu')
            .set('authorization', `Bearer ${token}`)
            .set('content-type', 'application/json');

        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');

    });

    it('should return a 404 status', async () => {
        const response = await request(router).get('/getByName/-1')
            .set('authorization', `Bearer ${token}`)
            .set('content-type', 'application/json');

        expect(response.status).toBe(404);
    });

    it('should return a 403 status', async () => {
        const response = await request(router).get('/getByName/pikachu')
            .set('authorization', `Bearer ${token + token}`)
            .set('content-type', 'application/json');

        expect(response.status).toBe(403);
    });


});


describe('POST pokemons routes', () => {
    it('Should create a new Pokemon', async () => {
        const response = await request(router)
            .post('/post')
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'Pikachu',
                type: 'Electric',
                generation: 1,
                captured: 1
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Pokemon saved', pokemon: { name: 'Pikachu', type: 'Electric', generation: 1, captured: 1, id_user: 1 } });
    });

    it('should return a 400 status', async () => {
        const response = await request(router)
            .post('/post')
            .set('authorization', `Bearer ${token}`)
            .send({
                name: '',
                type: 'Electric',
                generation: 1,
                captured: 1
            });

        expect(response.status).toBe(400);
    });

});

describe('DELETE Pokemon routes', () => {
    it('should delete a Pokemon by id', async () => {
        const response = await request(router)
            .delete('/delete/21')
            .set('authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200);
    });

    it('should return 404 error', async () => {
        const response = await request(router)
            .delete('/delete/')
            .set('authorization', `Bearer ${token}`)
        expect(response.status).toEqual(404);
    });

});


describe('EDIT pokemon routes', () => {

    it('should return 200 status and the new object', async () => {

        const response = await request(router).post('/edit/20')
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'Raichu',
                type: 'Electric',
                generation: 1,
                captured: 1
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Pokemon Updated', Pokemon: { name: 'Raichu', type: 'Electric', generation: 1, captured: 1, userId: 1 } });
    });

    it('should return 200 status and the new object', async () => {

        const response = await request(router).post('/edit/20')
            .set('authorization', `Bearer ${token}`)
            .send({
                name: '',
                type: 'Electric',
                generation: 1,
            });

        expect(response.status).toBe(400);
    });


});
