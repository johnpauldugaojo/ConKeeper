const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const authmiddleware = require('../middleware/authmiddleware');

// @route GET api/auth
// @desc Get Login User
// @access Private
router.get('/', authmiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); //pag correct ung token makukuha ung current user id
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error!');
  }
});

// @route Post api/auth
// @desc  Authenticate User and Get Token
// @access Public
router.post(
  '/',
  [
    body('email', 'Please include valid email address!').isEmail(),
    body('password', 'Password is Required!').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // pull out the email and password
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      // Pag di match ang password
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      // pag match > create payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
