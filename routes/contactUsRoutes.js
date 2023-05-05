const express = require('express');
const router = express.Router();
const Contact = require('../models/ContactUs.js');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');


router.post('/contactUs', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = await Contact.create({ name, email, message });

    const msg = {
      to: 'admin@example.com', // replace with the admin's email address
      from: 'noreply@example.com',
      subject: 'New message from the contact form',
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `
    };
    await sgMail.send(msg);

    res.status(201).json({ success: true, data: newContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
