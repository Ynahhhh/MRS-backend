const mongoose = require('mongoose')

const Details = require('../models/DetailsModel');
const AiringTimeModel = require('../models/AiringTimeModel');

// GET RESERVATION
const getDetails = async (req, res) => {
    const details = await Details.find({}).sort({createdAt: -1})
    res.status(200).json(details)
}

// CANCEL RESERVATION
const updateReservation = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Reservation'})
    }

    const reserve = await Details.findOneAndUpdate({_id:id}, {
        ...req.body
    })

    if(!reserve) {
        return res.status(400).json({errror: 'No such Reservation'})
    }
    res.status(200).json(reserve)
}

const updateSeatVacancy = async (req, res) => {
    const { movieId, position } = req.params;

    // Validate movie ID
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(404).json({ error: 'Invalid movie ID' });
    }

    try {
        // Find the movie by ID
        const movie = await AiringTimeModel.findById(movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Find the seat in the movie's seat array
        const seat = movie.a_seat.find(seat => seat.position === position);
        if (!seat) {
            return res.status(404).json({ error: 'Seat not found' });
        }

        // Update is_occupied property of the seat
        seat.is_occupied = false;

        // Save the movie with updated seat occupancy
        await movie.save();

        return res.status(200).json({ message: 'Seat occupancy updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



// EXPORT FUNCTION
module.exports = {
    getDetails,
    updateReservation,
    updateSeatVacancy
}
