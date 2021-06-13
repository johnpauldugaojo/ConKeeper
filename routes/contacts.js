const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authmiddleware = require('../middleware/authmiddleware');
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route GET api/contacts
// @desc Get All User
// @access Private
router.get('/', authmiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error!');
  }
});

// @route Post api/contact
// @desc  Add new Contact
// @access Private
router.post(
  '/',
  [authmiddleware, [body('name', 'Name is Required!').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pull-out the data on the body
    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save(); //Add to database
      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error!');
    }
  }
);

// @route Update api/contact/:id
// @desc  Update new Contact
// @access Private
router.put('/:id', authmiddleware, async (req, res) => {
  // Pull-out the data on the body
  const { name, email, phone, type } = req.body;

  // build contact object
  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: 'Contact not Found' });
    }

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized!' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error!');
  }
});

// @route Delete api/contact/:id
// @desc  Delete new Contact
// @access Private
router.delete('/:id', authmiddleware, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Not Authorized!' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized!' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact Deleted!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
