var express = require('express');
var router = express.Router();
const logger = require('../logger');

var auth = require('../controllers/auth');
var Post = require('../models/Post');
var User = require('../models/User');

router
  .route('/')
  .all(auth.checkAuthenticated)

  .post((req, res) => {
    let postData = req.body;
    postData.author = req.userId;

    let post = new Post(postData);

    post.save((err, result) => {
      if (err) {
        logger.error('saving post error');
        return res.status(500).send({ message: 'saving post error' });
      }
      res.status(200).send({ id: post._id });
    });
  });

router
  .route('/content')
  .all(auth.checkAuthenticated)
  .get(async (req, res) => {
    try {
      const userId = req.userId;

      const user = await User.findById(userId, '-pwd -__v');

      const posts = await Post.find()
        .where({
          author: { $in: user.following }
        })
        .populate('author');

      res.status(200).send(posts);
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ message: "Couldn't retrieve content" });
    }
  });

router
  .route('/:id')

  .get(async (req, res) => {
    var author = req.params.id;
    var posts = await Post.find({ author });
    res.send(posts);
  });

module.exports = router;
