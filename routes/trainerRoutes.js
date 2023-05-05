const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Trainer = require('../models/Trainer.js');

// Trainer login
// Trainer login
router.post('/trainerLogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const trainer = await Trainer.findOne({ email });
    if (!trainer) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, trainer.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Create and sign JWT token
    const token = jwt.sign({ userId: trainer._id }, process.env.JWT_SECRET);

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
    }); 
    
    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// Trainer registration
router.post('/trainerRegister', async (req, res) => {
    const { name, email, password, qualification } = req.body;
  
    try {
      let trainer = await Trainer.findOne({ email });
  
      if (trainer) {
        return res.status(400).json({ msg: 'Trainer already exists' });
      }
  
      trainer = new Trainer({
        name,
        email,
        password,
        qualification,
      });
  
      const salt = await bcrypt.genSalt(10);
      trainer.password = await bcrypt.hash(password, salt);
  
      await trainer.save();
  
      // Create and sign JWT token
      const token = jwt.sign({ userId: trainer._id }, process.env.JWT_SECRET);
  
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
      });
  
      res.json({ message: 'Registration successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

 // Get all trainers
router.get('/trainersAll', async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get trainer profile by ID
router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.json(trainer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


  


module.exports = router;
