require('dotenv').config()
const mongoose = require('mongoose')
const URI = process.env.MONGODB_URL
const DB = 'latihan'

mongoose.connect(URI, {
// mongoose.connect(`${URI}/${DB}`, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})