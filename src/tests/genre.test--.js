const request = require('supertest');
const app = require('../app');
require ('../models')

let genreId;

test('POST /genres', async () => {
  const newGenre = {
    name: 'Comedy'
  };
  const res = await request(app)
    .post('/genres')
    .send(newGenre);
  genreId = res.body.id;
  expect(res.statusCode).toEqual(201);
  expect(res.body.name).toBe(newGenre.name)
});

test('GET /genres', async () => {
const res = await request(app).get('/genres');
expect(res.statusCode).toEqual(200);
expect(res.body.length).toBe(1);
expect(res.body[0].movies).toBeDefined();
});

test('PUT /genres/:id', async () => {
  const updateGenre = {
    name: 'Comedy'
  };
  const res = await request(app)
    .put(`/genres/${genreId}`)
    .send(updateGenre);
  expect(res.statusCode).toEqual(200);
  expect(res.body.name).toBe(updateGenre.name);
});

test('DELETE /genres/:id', async () => {
  const res = await request(app).delete(`/genres/${genreId}`);
  expect(res.status).toBe(204);
});