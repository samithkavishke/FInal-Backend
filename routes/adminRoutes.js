const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Admin = require('../models/Admin.js');

// Admin login
router.post('/adminLogin', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const trainer = await Admin.findOne({ email });
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
    
    res.json({ message: 'Login successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// Admin registration
router.post('/adminRegister', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      let trainer = await Admin.findOne({ email });
  
      if (trainer) {
        return res.status(400).json({ msg: 'Admin already exists' });
      }
  
      trainer = new Admin({
        name,
        email,
        password,
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
  


module.exports = router;
