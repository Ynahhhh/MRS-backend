const express = require('express');
const {
    createDetails,
    getDetails,
    updateReservation,
    getAiringById
} = require('../controllers/DetailsController')

const router = express.Router();

// POST A NEW MOVIES
router.post('/', createDetails)

// GET ALL DETAILS
router.get('/', getDetails)

// UPDATE DETAILS
router.patch('/:id', updateReservation);

router.get('/time/:a_id', getAiringById);



module.exports = router;
