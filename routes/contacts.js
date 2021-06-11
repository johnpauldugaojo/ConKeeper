const express = require('express');
const router = express.Router();

// @route GET api/contacts
// @desc Get All User
// @access Private
router.get('/', (req, res) => {
  res.send('Get All Contacts');
});

// @route Post api/contact
// @desc  Add new Contact
// @access Private
router.post('/', (req, res) => {
  res.send('Add Contacts');
});

// @route Update api/contact/:id
// @desc  Update new Contact
// @access Private
router.put('/:id', (req, res) => {
  res.send('Update Contacts');
});

// @route Delete api/contact/:id
// @desc  Delete new Contact
// @access Private
router.delete('/:id', (req, res) => {
  res.send('Delete Contacts');
});

module.exports = router;
