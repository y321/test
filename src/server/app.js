var express = require('express')
var app = new express()
var router = require('../router/user')

bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.use('/users', router) // 将路由注册到/users的路径下

var url = "mongodb://localhost:27017/test"
var mongoose = require('mongoose')
mongoose.connect(url, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('db connect success')
    }
})

var port = process.env.PORT || 3000

app.listen(port)
console.log('app is listening on port: ' + port)