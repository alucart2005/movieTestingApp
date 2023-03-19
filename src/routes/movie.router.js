const { getAll, create, getOne, remove, update, setMovieDirector, setMovieActor, setMovieGenre } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/:id/actors')
    .post(setMovieActor);

movieRouter.route('/:id/directors')
    .post(setMovieDirector);

movieRouter.route('/:id/genres')
    .post(setMovieGenre);



module.exports = movieRouter;