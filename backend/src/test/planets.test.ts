import request from 'supertest';
import { app } from '../app';
import mongoose from 'mongoose';
import { Planet } from '../models/planets';

let token: string;
let createdPlanetId: string;
const fakeId = new mongoose.Types.ObjectId().toString();

beforeAll(async () => {
  // Faz login e guarda o token
  const response = await request(app)
    .post('/login')
    .send({
      email: 'admin@solar.com',
      password: '123456',
    });

  token = response.body.token;
});

beforeEach(async () => {
  await Planet.deleteMany({});

  // Cria um planeta válido para os testes de GET/:id
  const planetRes = await request(app)
    .post('/planets')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Test Planet',
      diameter: 5000,
      rotationPeriod: '10h',
      distanceFromSun: 300,
      hasRings: false,
      imageUrl: 'https://example.com/image.jpg',
    });

  createdPlanetId = planetRes.body._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /planets', () => {
  it('should return 200 and a list of planets', async () => {
    const res = await request(app)
      .get('/planets')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /planets', () => {
  it('should return 201 and the new planet when data is valid', async () => {
    const planetName = `Other Planet ${Date.now()}`;
    const newPlanet = {
      name: planetName,
      diameter: 6779,
      rotationPeriod: '24.6h',
      distanceFromSun: 227.9,
      hasRings: false,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
    };

    const res = await request(app)
      .post('/planets')
      .set('Authorization', `Bearer ${token}`)
      .send(newPlanet);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('name', planetName);
  });

  it('should return 400 if planet already exists', async () => {
    const existingPlanet = {
      name: 'Test Planet', // mesmo nome do criado no beforeEach
      diameter: 5000,
      rotationPeriod: '10h',
      distanceFromSun: 300,
      hasRings: false,
      imageUrl: 'https://example.com/image.jpg',
    };

    const res = await request(app)
      .post('/planets')
      .set('Authorization', `Bearer ${token}`)
      .send(existingPlanet);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Planet already exists!');
  });

  it('should return 400 if required fields are missing', async () => {
    const incompletePlanet = {
      name: 'Neptune',
    };

    const res = await request(app)
      .post('/planets')
      .set('Authorization', `Bearer ${token}`)
      .send(incompletePlanet);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Missing fields');
  });
});

describe('GET /planets/:id', () => {
  it('should return 200 and the planet when a valid ID is passed', async () => {
    const res = await request(app)
      .get(`/planets/${createdPlanetId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', createdPlanetId);
  });

  it('should return 404 when a non-existent ID is passed', async () => {
    const res = await request(app)
      .get(`/planets/${fakeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'Planet not found');
  });
});
