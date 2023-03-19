const request = require('supertest');
const app = require('../app');
require ('../models')

let directorId;

test('POST /directors', async () => {
  const newDirector = {
    firstName: 'John',
    lastName: 'Doe',
    nationality: 'American',
    image: 'https://www.google.com',
    birthday: '1990-01-01'
  };
  const res = await request(app)
    .post('/directors')
    .send(newDirector);
  directorId = res.body.id;
  expect(res.statusCode).toEqual(201);
  expect(res.body.name).toBe(newDirector.name)
});

test('GET /directors', async () => {
const res = await request(app).get('/directors');
expect(res.statusCode).toEqual(200);
expect(res.body.length).toBe(1);
expect(res.body[0].movies).toBeDefined();
});

test('PUT /directors/:id', async () => {
  const updateDirector = {
    firstName: 'Jane',
    lastName: 'Doe',
    nationality: 'American',
    image: 'https://www.google.com',
    birthday: '1990-01-01'
  };
  const res = await request(app)
    .put(`/directors/${directorId}`)
    .send(updateDirector);
  expect(res.statusCode).toEqual(200);
  expect(res.body.firstName).toBe(updateDirector.firstName);
  expect(res.body.lastName).toBe(updateDirector.lastName);
});

test('DELETE /directors/:id', async () => {
  const res = await request(app).delete(`/directors/${directorId}`);
  expect(res.status).toBe(204);
});