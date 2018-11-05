const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const logger = require('./logger');

const auth = require('./controllers/auth');
const posts = require('./controllers/posts');
const users = require('./controllers/users');
(async () => {
  try {
    mongoose.Promise = Promise;

    app.use(cors());
    app.use(bodyParser.json());

    const mongoUriString = process.env.MLAB_URI || 'mongodb://localhost/jvm-social';

    await mongoose.connect(
      mongoUriString,
      { useNewUrlParser: true }
    );
    logger.info('connected to mongo');

    app.use('/auth', auth.router);
    app.use('/posts', posts);
    app.use('/users', users);
    app.use('*', function(req, res) {
      res.status(404).send({ message: 'Not found' });
    });

    app.listen(process.env.PORT || 3000);
  } catch (error) {
    console.error(error);
  }
})();
