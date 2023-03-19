const request = require('supertest');
const app = require('../app');
require ('../models')

let actorId;

test('POST /actors', async () => {
  const newActor = {
    firstName: 'John',
    lastName: 'Doe',
    nationality: 'American',
    image: 'https://www.google.com',
    birthday: '1990-01-01'
  };
  const res = await request(app)
    .post('/actors')
    .send(newActor);
  actorId = res.body.id;
  expect(res.statusCode).toEqual(201);
  expect(res.body.name).toBe(newActor.name)
});

test('GET /actors', async () => {
const res = await request(app).get('/actors');
expect(res.statusCode).toEqual(200);
expect(res.body.length).toBe(1);
expect(res.body[0].movies).toBeDefined();
});

test('PUT /actors/:id', async () => {
  const updateActor = {
    firstName: 'Jane',
    lastName: 'Doe',
    nationality: 'American',
    image: 'https://www.google.com',
    birthday: '1990-01-01'
  };
  const res = await request(app)
    .put(`/actors/${actorId}`)
    .send(updateActor);
  expect(res.statusCode).toEqual(200);
  expect(res.body.firstName).toBe(updateActor.firstName);
  expect(res.body.lastName).toBe(updateActor.lastName);
});

test('DELETE /actors/:id', async () => {
  const res = await request(app).delete(`/actors/${actorId}`);
  expect(res.status).toBe(204);
});