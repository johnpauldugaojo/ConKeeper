const express = require('express');
const router = express.Router();

// @route GET api/auth
// @desc Get Login User
// @access Private
router.get('/', (req, res) => {
  res.send('Get Logged in user');
});

// @route Post api/auth
// @desc  Authenticate User and Get Token
// @access Public
router.post('/', (req, res) => {
  res.send('Authenticate User');
});

module.exports = router;
