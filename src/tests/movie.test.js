const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
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

test('PUT /movies/:id', async () => {
  const updateMovie = {
    name: 'The Matrix Reloaded',
    image: 'https://www.google.com',
    synopsis: 'A movie about a hacker',
    releaseYear: 1999
  };
  const res = await request(app)
    .put(`/movies/${movieId}`)
    .send(updateMovie);
  expect(res.statusCode).toEqual(200);
  expect(res.body.name).toBe(updateMovie.name);
});

test('POST /movies/:id/actors', async () => {
  const actor = await Actor.create({
    firstName: 'John',
    lastName: 'Doe',
    nationality: 'American',
    image: 'https://www.google.com',
    birthday: '1990-01-01'
  });
  const res = await request(app)
    .post(`/movies/${movieId}/actors`)
    .send([actor.id])
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  
  });

test('POST /movies/:id/directors', async () => {
  const newDirector = await Director.create({
    firstName: 'John',
    lastName: 'Doe',
    nationality: 'American',
    image: 'https://www.google.com',
    birthday: '1990-01-01'
  });
  const res = await request(app)
    .post(`/movies/${movieId}/directors`)
    .send([newDirector.id])
    await newDirector.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/genres', async () => {
  const newGenre = await Genre.create({
    name: 'Action'
  });
  const res = await request(app)
    .post(`/movies/${movieId}/genres`)
    .send([newGenre.id])
    await newGenre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('DELETE /movies/:id', async () => {
  const res = await request(app).delete(`/movies/${movieId}`);
  expect(res.status).toBe(204);
});

