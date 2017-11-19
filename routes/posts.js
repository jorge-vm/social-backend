var express = require('express')
var router = express.Router();

router.route('/')

.post(auth.checkAuthenticated, (req, res) => {
    var postData = req.body
    postData.author = req.userId

    var post = new Post(postData)

    post.save((err, result) => {
        if (err) {
            console.error('saving post error')
            return res.status(500).send({ message: 'saving post error' })
        }

        res.sendStatus(200)
    })
})

router.route('/:id')

.get(async (req, res) => {
    var author = req.params.id
    var posts = await Post.find({ author })
    res.send(posts)
})

module.exports = router