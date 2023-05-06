const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation.js');

// Create a reservation
router.post('/Booking', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.json(reservation);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get all reservations
router.get('/Booking', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
