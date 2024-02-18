const mongoose = require('mongoose')

const Details = require('../models/DetailsModel')
const Movies = require('../models/MoviesModel')


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

// export function
module.exports = {
    createDetails,
    getDetails,
    updateReservation
}