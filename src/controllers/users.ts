import { Router } from 'express';
import { checkAuthenticated } from '../controllers/auth';
import { default as User, UserModel } from '../models/User';

let router = Router();

router.route('/').get(async (req, res) => {
    try {
        let users: UserModel[] = await User.find({}, '-pwd -__v');
        res.send(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.route('/:id').get(async (req, res) => {
    try {
        let user = await User.findById(req.params.id, '-pwd -__v');
        res.send(user);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router
    .route('/follow')
    .all(checkAuthenticated)
    .post(async (req, res) => {
        try {
            let profileId = req.body.profileId;
            let userId = req.body.userId;

            let user = await User.findById(userId, '-pwd -__v');

            if (!user) return res.status(404).send({ message: 'not found' });

            user.following.push(profileId);

            let result = await user.save();
            if (result.id === user.id) res.status(200).send({ following: 'success' });
        } catch (error) {
            console.error('saving followee error');
            return res.status(500).send({ message: 'following error' });
        }
    });

export default router;
