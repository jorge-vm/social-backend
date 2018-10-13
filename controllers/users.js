const express = require('express');
let router = express.Router();

const auth = require('../controllers/auth');
const User = require('../models/User');

router
  .route('/')

  .get(async (req, res) => {
    try {
      const users = await User.find({}, '-pwd -__v');
      res.send(users);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

router
  .route('/:id')

  .get(async (req, res) => {
    try {
      const user = await User.findById(req.params.id, '-pwd -__v');
      res.send(user);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

router
  .route('/follow')
  .all(auth.checkAuthenticated)
  .post(async (req, res) => {
    try {
      const profileId = req.body.profileId;
      const userId = req.userId;

      let user = await User.findById(userId, '-pwd -__v');

      user.following.push(profileId);

      await user.save();

      res.status(200).send({ following: 'success' });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'saving followee error' });
    }
  });

module.exports = router;
