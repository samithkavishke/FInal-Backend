const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  qualification: { type: String}
});

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;
