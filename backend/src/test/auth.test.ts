import request from 'supertest';
import { app } from '../app';

let token = '';

describe('POST /login', () => {
    it('should return 200 and a token when credentials are correct', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'admin@solar.com',
                password: '123456',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(typeof response.body.token).toBe('string');
        token = response.body.token; // ← correção aqui
    });

    it('should return 401 when credentials are incorrect', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'admin@solar.com',
                password: 'wrongpassword',
            });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });
});
