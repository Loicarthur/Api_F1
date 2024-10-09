import request from 'supertest';
import app from '../index';
import mongoose from 'mongoose';
import Timer from '../models/Timer';
import User from '../models/User';

let tokenUser: string;
let tokenAdmin: string;

beforeAll(async () => {
  await User.deleteMany({});
  await Timer.deleteMany({});

  // Créer un utilisateur standard
  const userRes = await request(app).post('/api/auth/register').send({
    email: 'testtestuser1@example.com',
    password: 'password123',
    role: true,
  });

  // Créer un administrateur
  const adminRes = await request(app).post('/api/auth/register').send({
    email: 'testtestadmin1@example.com',
    password: 'adminpassword',
    role: false,
  });

  // Connecter l'utilisateur standard pour obtenir un token
  const loginUserRes = await request(app).post('/api/auth/login').send({
    email: 'testtestuser1@example.com',
    password: 'password123',
  });

  tokenUser = loginUserRes.body.token;

  // Connecter l'administrateur pour obtenir un token
  const loginAdminRes = await request(app).post('/api/auth/login').send({
    email: 'testtestadmin1@example.com',
    password: 'adminpassword',
  });

  tokenAdmin = loginAdminRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Timer API', () => {
  it('devrait soumettre un temps de réaction', async () => {
    const res = await request(app)
      .post('/api/timer/submit-reaction-time')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send({ time: 150 });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Temps de réaction enregistré avec succès.');
  });

  it('devrait récupérer les temps de l\'utilisateur connecté', async () => {
    const res = await request(app)
      .get('/api/timer/me')
      .set('Authorization', `Bearer ${tokenUser}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('devrait récupérer tous les temps de réaction (administrateur uniquement)', async () => {
    const res = await request(app)
      .get('/api/timer/all')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('ne devrait pas permettre à un utilisateur non admin de récupérer tous les temps', async () => {
    const res = await request(app)
      .get('/api/timer/all')
      .set('Authorization', `Bearer ${tokenUser}`);

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty('message', 'Accès refusé.');
  });
});
