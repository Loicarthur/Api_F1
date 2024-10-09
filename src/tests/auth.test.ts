import request from 'supertest';
import app from '../index';
import mongoose from 'mongoose';

describe('Auth API', () => {
  it('devrait inscrire un nouvel utilisateur', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'testtest1@example.com',
      password: 'password123',
      role: true,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Utilisateur créé avec succès.');
  });

  it('ne devrait pas inscrire un utilisateur existant', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'testtest1@example.com',
      password: 'password123',
      role: true,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', "L'utilisateur existe déjà.");
  });

  it('devrait connecter l\'utilisateur', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'testtest1@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});

// Fermer la connexion après tous les tests
afterAll(async () => {
  await mongoose.connection.close();
});
