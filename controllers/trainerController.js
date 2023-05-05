// const { validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const Trainer = require('../models/Trainer');

// exports.trainerRegister = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { name, email, password } = req.body;
  
//   try {
//     let trainer = await Trainer.findOne({ email });

//     if (trainer) {
//       return res
//         .status(400)
//         .json({ errors: [{ msg: 'Trainer already exists' }] });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     trainer = new Trainer({
//       name,
//       email,
//       password: hashedPassword,
//       profilePicture: req.file.path,
//     });

//     await trainer.save();

//     res.status(200).json({ msg: 'Trainer registered successfully' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };
