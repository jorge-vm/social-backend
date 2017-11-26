var express = require('express')
var router = express.Router();

var auth = require('../controllers/auth')
var Post = require('../models/Post')

router.route('/')
    .all(auth.checkAuthenticated)
    
    .post((req, res) => {
        let postData = req.body
        postData.author = req.userId

        let post = new Post(postData)

        post.save((err, result) => {
            if (err) {
                console.error('saving post error')
                return res.status(500).send({ message: 'saving post error' })
            }
            res.status(200).send({ id: post._id })
        })
    })

router.route('/:id')

    .get(async (req, res) => {
        var author = req.params.id
        var posts = await Post.find({ author })
        res.send(posts)
    })

module.exports = router