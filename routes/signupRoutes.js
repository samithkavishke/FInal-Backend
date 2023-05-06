const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/SignupSigning.js');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, address, phoneNumber, nic} = req.body;

    // Check if the email is already registered
    const user = await User.findOne({ email:email });
    if (user) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Update password to the latest bcrypt version
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ name, email, password, address, phoneNumber, nic: hashedPassword });
    await newUser.save();

    // Create a JSON web token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Log in an existing user
router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // Check if the email is registered
    const user = await User.findOne({email: email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: 'Email not registered' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Create a JSON web token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ user, token });
//     User.findOne({ email: email }).then( (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(data);
//   }
// });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
