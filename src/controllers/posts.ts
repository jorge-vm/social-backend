import { Router } from 'express';
import { checkAuthenticated } from '../controllers/auth';
import { default as Post, PostModel } from '../models/Post';

const router = Router();
router
    .route('/')
    .all(checkAuthenticated)
    .post(async (req: any, res) => {
        try {
            let postData = req.body;
            postData.author = req.userId;
            let post = new Post(postData);
            await post.save();
            res.status(200).send({ id: post._id });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'saving post error' });
        }
    });

router.route('/:id').get(async (req, res) => {
    const author = req.params.id;
    const posts = await Post.find({ author });
    res.send(posts);
});

export default router;
