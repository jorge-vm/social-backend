import { compare } from 'bcrypt-nodejs';
import { encode, decode } from 'jwt-simple';
import { Router, Request, Response, NextFunction } from 'express';
import { default as User, UserModel } from '../models/User';

let router = Router();

router.post('/register', (req, res) => {
    let userData = req.body;

    let user = new User(userData);

    user.save((err, newUser) => {
        if (err) return res.status(500).send({ message: 'Error saving user' });

        createSendToken(res, newUser);
    });
});

router.post('/login', async (req, res) => {
    let loginData = req.body;

    let user = await User.findOne({ email: loginData.email });

    if (!user) return res.status(401).send({ message: 'Email or Password invalid' });

    compare(loginData.pwd, user.pwd, (err, isMatch) => {
        if (!isMatch) return res.status(401).send({ message: 'Email or Password invalid' });

        createSendToken(res, user);
    });
});

function createSendToken(res: Response, user: any) {
    let payload = { sub: user._id };

    let token = encode(payload, '123');

    res.status(200).send({ token });
}

export const checkAuthenticated = (req: any, res: Response, next: NextFunction) => {
    if (!req.header('authorization')) return res.status(401).send({ message: 'Unauthorized. Missing Auth Header' });

    let token = req.header('authorization').split(' ')[1];

    let payload = decode(token, '123');

    if (!payload) return res.status(401).send({ message: 'Unauthorized. Auth Header Invalid' });

    req.userId = payload.sub;

    next();
};

export default router;
