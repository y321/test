var express = require('express')
var router = express.Router()

var User = require('../models/user')

router.route('/validate').post((req, res) => {
    User.findOne({name: req.body.name, pass: req.body.pass}, (err, user) => {
        if (err) {
            console.log(err)
        }
        res.json(user)
    })
})

router.route('/reg').post((req, res) => {
    
    User.create({name: req.body.name, pass: req.body.pass}, (err, req) => {
        if (err) console.log(err)
        res.json(req)
    })
})

module.exports = router