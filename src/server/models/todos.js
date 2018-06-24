var mongoose = require('mongoose')

module.exports = mongoose.model('Todos', new mongoose.Schema({
    name: String,
    place:String,
    remarks: String,
    status: Number,
    starttime:Date,
    endtime: Date
}))