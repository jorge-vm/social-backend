var express = require('express')
var cors = require('cors')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var app = express()

var auth = require('./controllers/auth')
var posts = require('./controllers/posts')
var users = require('./controllers/users')

mongoose.Promise = Promise

app.use(cors())
app.use(bodyParser.json())

var mongoUriString =
process.env.MLAB_URI ||
'mongodb://localhost/jvm-social' 


mongoose.connect(mongoUriString, { useMongoClient: true }, (err) => {
    if (!err)
        console.log('connected to mongo')
})
 
app.use('/auth', auth.router)
app.use('/posts',posts)
app.use('/users',users)

app.listen(process.env.PORT || 3000)