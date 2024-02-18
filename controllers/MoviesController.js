const mongoose = require('mongoose')

// IMPORT MODEL
const Movies = require('../models/MoviesModel');
const AiringTime = require('../models/AiringTimeModel');
const MoviesModel = require('../models/MoviesModel');
const AiringTimeModel = require('../models/AiringTimeModel');

// POST MOVIES OF CURRENT DATE
// -- get date
const createMovies = async (req, res) => {
    try {
        const movie = await Movies.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// POST AIRING TIME
const addMovieTimeSlot = async (req, res) => {
    try {
        const { movie_id, a_type, a_date, a_starttime, a_endtime, a_price, a_cinema } = req.body;
        const seatingArrangement = generateSeating();
        const airingTime = new AiringTime({ 
            movie_id,
            a_type,
            a_date,
            a_starttime,
            a_endtime,
            a_price,
            a_cinema,
            a_seat: seatingArrangement
        });
        await airingTime.save(); // Save the airingTime instance
        res.status(201).json({ message: 'Airing time added successfully' });
    } catch (error) {
        console.error('Error adding airing time:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// GET SHOWING MOVIES WITH TODAY RANGE
// -- get date user input or today date by default
const getMoviesWithShow = async (req, res) => {
    const { date } = req.query;
    try {
        const movies = await MoviesModel.find({
            startdate: { $lte: date },
            enddate: { $gte: date }
        });
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// GET MOVIE BY ID
// -- get movie id
getMovieById = async (req, res) => {
    try {
        const { m_id } = req.params;
        const movie = await MoviesModel.findOne({ m_id });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        console.error('Error getting movie by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// GET UNIQUE DATES UNDER SPECIFIC MOVIE
// -- get movie id
getUniqueDatesByMovieId = async (req, res) => {
    try {
        const { movie_id } = req.params;
        const uniqueDates = await AiringTime.distinct('a_date', { movie_id });
        res.status(200).json(uniqueDates);
    } catch (error) {
        console.error('Error fetching unique dates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// GET ALL THE TIMESLOT UNDER SPECIFIC MOVIE AND DATE
// get -- movie_id, date
const getAiringTimes = async (req, res) => {
    try {
        const { movie_id, date } = req.params;
        const selectedDate = new Date(date);
        const airingTimes = await AiringTimeModel.find({
            movie_id: movie_id,
            a_date: {
                $gte: selectedDate, // Greater than or equal to selected date
                $lt: new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000) // Less than the next day
            }
        });
        res.status(200).json(airingTimes);
    } catch (error) {
        console.error('Error fetching airing times:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// GET TIMESLOT WITH AIRING ID
getAiringById = async (req, res) => {
    try {
        const { a_id } = req.params;
        const airing = await AiringTimeModel.findOne({ a_id });
        if (!airing) {
            return res.status(404).json({ message: 'Time slot not found' });
        }
        res.status(200).json(airing);
    } catch (error) {
        console.error('Error getting airing by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// FUNCTION GENERATE SEAT
function generateSeating() {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const columns = ['1', '2', '3', '4', '5'];
    const seating = [];

    rows.forEach(row => {
        columns.forEach(column => {
            const seat = {
                position: row + column,
                is_occupied: false
            };
            seating.push(seat);
        });
    });

    return seating;
}

// EXPORT FUNCTION
module.exports = {
    createMovies,
    addMovieTimeSlot,
    getMoviesWithShow,
    getMovieById,
    getUniqueDatesByMovieId,
    getAiringTimes,
    getAiringById
}
