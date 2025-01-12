const mongoose = require('mongoose')

const schema = mongoose.Schema({
    userEmail : String,
    userPassword : String
})

module.exports = mongoose.model('User',schema)