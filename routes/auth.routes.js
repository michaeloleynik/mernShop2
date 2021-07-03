const {Router} = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');

const router = Router();

// /api/auth/register

router.post(
  '/register',
  [
    check('email', 'Wrong E-mail!').isEmail(),
    check('password', 'Wrong Password, min length is 8 symbols!').isLength({min: 8})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array(), message: "Incorrect E-mail or Password"});
      }

      const {email, password, admin, secretWord} = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({message: "A user with the same name is already exists!"});
      }

      const hashedPass = await bcrypt.hash(password, 16);
      
      const user = new User({email, password: hashedPass, admin, secretWord});

      await user.save();

      res.status(201).json({message: "The user has been created successfully!"})

    } catch (e) {
      res.status(500).json({message: "Something went wrong..."});
    }
});

// /api/auth/login

router.post(
  '/login',
  [
    check('email', 'Please put correct data!').normalizeEmail().isEmail(),
    check('password', 'Please put correct data!').exists()
  ], 
  async (req, res) => {
  try {
      const errors = validationResult(req);

      if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array(), message: "Incorrect E-mail or Password"})
      }

      const {email, password} = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({message: " The user is not found!"});
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({message: "Password is not correct!"});
      }

      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      );

      res.json({token, userId: user.id, isAdmin: user.admin, secretWord: user.secretWord});

    } catch (e) {
      res.status(500).json({message: "Something went wrong..."});
    }
});

module.exports = router;