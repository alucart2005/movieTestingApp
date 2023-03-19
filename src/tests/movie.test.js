const request = require('supertest');
const app = require('../app');
require ('../models')

let movieId;

test('POST /movies', async () => {
  const newMovie = {
    name: 'The Matrix',
    image: 'https://www.google.com',
    synopsis: 'A movie about a hacker',
    releaseYear: 1999
  };
  const res = await request(app)
    .post('/movies')
    .send(newMovie);
  movieId = res.body.id;
  expect(res.statusCode).toEqual(201);
});

test('GET /movies', async () => {
const res = await request(app).get('/movies');
expect(res.statusCode).toEqual(200);
expect(res.body.length).toBe(1);
expect(res.body[0].actors).toBeDefined();
expect(res.body[0].directors).toBeDefined();
expect(res.body[0].genres).toBeDefined();
});