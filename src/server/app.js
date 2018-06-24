var express = require('express')
var app = new express()
var router = require('./route/user')

bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

//http请求头部允许跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.use('/users', router) // 将路由注册到/users的路径下
app.use('/todos', require('./route/router'))

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