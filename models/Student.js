const mongoose = require('mongoose')

const schema = mongoose.Schema({
    studentid:Number,
    studentName:String,
    studentDept:String,
    studentSpi:Number,
    studentEmail:String,
    studentMobile:Number
})

module.exports = mongoose.model("Student",schema);