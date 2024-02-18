const mongoose = require('mongoose')

const Details = require('../models/DetailsModel')
const Movies = require('../models/MoviesModel');
const AiringTimeModel = require('../models/AiringTimeModel');


// CREATE NEW 
const createDetails = async (req, res) => {
    const { f_name, m_name, l_name, senior, res_id, seat, amt_pay, isCancel, m_id } = req.body;

    try {
        const details = await Details.create({ f_name, m_name, l_name, senior, res_id, seat, amt_pay, isCancel, m_id });
        res.status(200).json(details);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//GET ALL DETAILS
const getDetails = async (req, res) => {
    const details = await Details.find({}).sort({createdAt: -1})
    res.status(200).json(details)
}

//UPDATE DETAILS
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

// UPDATE SEAT RESERVATION
const updateSeatOccupancy = async (req, res) => {
    const { a_id, position } = req.params;

    // Validate movie ID
    if (!mongoose.Types.ObjectId.isValid(a_id)) {
        return res.status(404).json({ error: 'Invalid movie ID' });
    }

    try {
        // Find the movie by ID
        const details = await AiringTimeModel.findById(a_id);
        if (!details) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Find the seat in the movie's seat array
        const seat = details.m_seat.find(seat => seat.position === position);
        if (!seat) {
            return res.status(404).json({ error: 'Seat not found' });
        }

        // Update is_occupied property of the seat
        seat.is_occupied = true;

        // Save the movie with updated seat occupancy
        await details.save();

        return res.status(200).json({ message: 'Seat occupancy updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// UPDATE SEAT RESERVATION
const updateSeatVacancy = async (req, res) => {
    const { a_id, position } = req.params;

    // Validate movie ID
    if (!mongoose.Types.ObjectId.isValid(a_id)) {
        return res.status(404).json({ error: 'Invalid movie ID' });
    }

    try {
        // Find the movie by ID
        const details = await AiringTimeModel.findById(a_id);
        if (!details) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Find the seat in the movie's seat array
        const seat = details.m_seat.find(seat => seat.position === position);
        if (!seat) {
            return res.status(404).json({ error: 'Seat not found' });
        }

        // Update is_occupied property of the seat
        seat.is_occupied = false;

        // Save the movie with updated seat occupancy
        await details.save();

        return res.status(200).json({ message: 'Seat occupancy updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


// export function
module.exports = {
    createDetails,
    getDetails,
    updateReservation,
    updateSeatOccupancy,
    updateSeatVacancy
}