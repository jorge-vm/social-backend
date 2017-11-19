var express = require('express')
var cors = require('cors')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var app = express()

var auth = require('./routes/auth')
var posts = require('./routes/posts')
var users = require('./routes/users')

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