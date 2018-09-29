import express from 'express';
import cors from 'cors';
import { connect, Mongoose } from 'mongoose';
import { json } from 'body-parser';
import auth from './controllers/auth';
import users from './controllers/users';
import posts from './controllers/posts';

const app = express();

const init = async () => {
    try {
        app.use(cors());
        app.use(json());

        const mongoUriString = process.env.MLAB_URI || 'mongodb://localhost/jvm-social';

        await connect(mongoUriString);

        app.use('/auth', auth);
        app.use('/posts', posts);
        app.use('/users', users);

        app.listen(process.env.PORT || 3000);
    } catch (error) {
        console.error(error);
    }
};

init();
