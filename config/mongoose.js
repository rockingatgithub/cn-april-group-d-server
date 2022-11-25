const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/auth_app')

const db = mongoose.connection

db.once('open', () => {
    console.log('Connected To DB😄')
})

module.exports = db