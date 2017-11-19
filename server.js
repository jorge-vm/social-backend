var express = require('express')
var cors = require('cors')
var mongoose = require('mongoose')
var app = express()

var User = require('./models/User.js')
var Post = require('./models/Post.js')
var auth = require('./routes/auth.js')
var posts = require('./routes/posts.js')
var users = require('./routes/users.js')

mongoose.Promise = Promise

app.use(cors())
app.use(bodyParser.json())

mongoose.connect('', { useMongoClient: true }, (err) => {
    if (!err)
        console.log('connected to mongo')
})

app.use('/auth', auth.router)
app.use('/posts',posts)
app.use('/users',users)

app.listen(process.env.PORT || 3000)