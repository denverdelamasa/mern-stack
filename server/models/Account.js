const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const AccountModel = mongoose.model('Account', accountSchema)

module.exports = AccountModel