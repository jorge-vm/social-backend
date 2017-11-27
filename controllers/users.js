var express = require('express')
var router = express.Router();

var auth = require('../controllers/auth')
var User = require('../models/User')

router.route('/')

.get(async (req, res) => {
    try {
        var users = await User.find({}, '-pwd -__v')
        res.send(users)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

router.route('/:id')

.get(async (req, res) => {
    try {
        var user = await User.findById(req.params.id, '-pwd -__v')
        res.send(user)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

router.route('/follow')
.all(auth.checkAuthenticated)
.post(async (req, res) => {
    let profileId = req.body.profileId
    let userId = req.userId

    var user = await User.findById(userId, '-pwd -__v')
    
    user.following.push(profileId)

    user.save((err, result) => {
        if (err) {
            console.error('saving followee error')
            return res.status(500).send({ message: 'following error' })
        }
        res.status(200).send({ following: 'success' })
    })
})


module.exports = router