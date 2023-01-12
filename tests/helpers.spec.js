const helpers = require('../lib/utils.js');
const bcrypt = require('bcrypt');

describe('bcrypt helpers', () => {

    const passwords = {
        normal : '<>!"#PASSWORD123',
        correct : '$2b$10$EdgwyPZhHZiIMj.IFN7p9uLz2uHurUPKoaBaanoTNIp0VoCdLQNo2',
        incorrect : '$2b$10$EdgwyPZhHZiIMjIFN7p9uLz2uHurUPKoaBaanoTNIp0VoCdLQNo2'
    }

    it('should return a positive answer', async () => {
        const result = await helpers.matchPassword(passwords.normal, passwords.correct);
        expect(result).toBe(true);
    });

    it('should return a negative answer', async () => {
        const result = await helpers.matchPassword(passwords.normal, passwords.incorrect);
        expect(result).toBe(false);
    });

});

describe('token helpers', () => {

    const headers = {
        'content-type': 'application/json',
        'authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IndrbnNzIiwicGFzc3dvcmQiOiJhZG1pbjEyMyJ9LCJpYXQiOjE2NzMzMDA0ODZ9.FjNeeTXXF0s_c8DIT0p9Tui8yqfCmX0qrNFSPRX8f4s'
    };

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IndrbnNzIiwicGFzc3dvcmQiOiJhZG1pbjEyMyJ9LCJpYXQiOjE2NzMzMDA0ODZ9.FjNeeTXXF0s_c8DIT0p9Tui8yqfCmX0qrNFSPRX8f4s';
    const id = 1;

    it('should return the token', async () => {
        const result = await helpers.getTokenFromHeader(headers);
        expect(result).toBe(token);
    });

    it('should return the id from the database', async () => {
        const result = await helpers.getUserFromToken(token);
        expect(result).toBe(id);
    });

    it('should should never return a error or a incorrect answer', async () => {
        for(let i = 2; i <= 100; ++i){
            const result = await helpers.getUserFromToken(token);
            expect(result).toBe(id);
        }
    });
});