import { app, prisma } from '../src/app';
import { test, expect, it, afterAll } from '@jest/globals';

import request from 'supertest';

afterAll(async () => {
    await prisma.$disconnect();
});

const user = {
    name: 'user 1',
    email: 'user1@a.com',
};

describe('Users', () => {
    it('should add a new user', async () => {
        const secondUser = {
            name: 'user 2',
            email: 'user2@a.com',
        };
        const response1 = await request(app).post('/users').send(user).expect(201);
        const response2 = await request(app).post('/users').send(secondUser).expect(201);

        expect(response1.body.id).toBeDefined();
        expect(response2.body.id).toBeDefined();
    });

    it('should not add a new user that fails validation', async () => {
        const badUser = {
            email: 'foo',
        };
        const validationResult = {
            issues: [
                {
                    code: 'invalid_type',
                    expected: 'string',
                    message: 'Required',
                    path: ['name'],
                    received: 'undefined',
                },
                {
                    code: 'invalid_string',
                    message: 'Invalid email',
                    path: ['email'],
                    validation: 'email',
                },
            ],
            name: 'ZodError',
        };
        const response = await request(app).post('/users').send(badUser);
        expect(response.statusCode).toEqual(422);
        expect(response.body).toEqual(validationResult);
    });

    it('should not add a new user with an existing email', async () => {
        return await request(app).post('/users').send(user).expect(409);
    });

    it('should return all users with no sort param', async () => {
        const response = await request(app).get('/users').expect(200);

        expect(response.body).toBeDefined();
        expect(response.body.length).toEqual(2);
    });
    it('should return all users with working sorts (asc)', async () => {
        const response = await request(app).get('/users').query('created=asc').expect(200);

        expect(response.body[0].name).toEqual('user 1');
    });
    it('should return all users with working sorts (desc)', async () => {
        const response = await request(app).get('/users').query('created=desc').expect(200);

        expect(response.body[0].name).toEqual('user 2');
    });
});
