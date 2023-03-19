const { expectCt } = require('helmet');
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
  expect(res.body.length).toHaveLength(1);
});