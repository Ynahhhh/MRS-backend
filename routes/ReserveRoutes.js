const express = require('express');
const {
    getDetails,
    updateReservation,
    updateSeatVacancy
} = require('../controllers/ReservationController')

const router = express.Router();

router.get('/', getDetails);
router.patch('/:id', updateReservation);
router.patch('/cancel/:movieId/:position', updateSeatVacancy);




module.exports = router;
