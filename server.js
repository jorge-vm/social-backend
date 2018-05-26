'use strict';
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const auth = require('./controllers/auth');
const posts = require('./controllers/posts');
const users = require('./controllers/users');

const init = async () => {
  try {
    mongoose.Promise = Promise;

    app.use(cors());
    app.use(bodyParser.json());

    const mongoUriString =
      process.env.MLAB_URI || 'mongodb://localhost/jvm-social';

    await mongoose.connect(mongoUriString, { useMongoClient: true });
    
    app.use('/auth', auth.router);
    app.use('/posts', posts);
    app.use('/users', users);

    app.listen(process.env.PORT || 3000);
  } catch (error) {
    console.error(error);
  }
};

init();
