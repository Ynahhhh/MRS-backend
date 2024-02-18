const express = require('express');
const {
    getAiringById,
    createMovies,
    addMovieTimeSlot,
    getMoviesWithShow,
    getMovieById,
    getUniqueDatesByMovieId,
    getAiringTimes,

} = require('../controllers/MoviesController')

const router = express.Router();

// CREATE MOVIES
router.post('/', createMovies)

// CREATE AIRING TIME
router.post('/:movie_id', addMovieTimeSlot);

// GET MOVIES THAT IS SHOWING
router.get('/', getMoviesWithShow);

// GET MOVIES WITH MOVIE ID
router.get('/:m_id', getMovieById);

// GET THE SLOT FOR SPECIFIC TIME
router.get('/airing/:a_id', getAiringById);

// GET UNIQUE DATES WITH MOVIE ID
router.get('/date/:movie_id', getUniqueDatesByMovieId);

// GET TIMESLOT WITH MOVIE ID npAND DATE
router.get('/:movie_id/:date', getAiringTimes);


module.exports = router;
