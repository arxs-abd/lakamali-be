require('../utils/db')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    id_user : {
        type : String,
    },
    id_public : {
        type : String
    },
    user : {
        type : String,
    },
    title : {
        type : String,
        required : true,
    },
    slug : {
        type : String,
        required : true,
    },
    thumbnail : {
        type : String,
        required : false,
    },
    content : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true
    }
}, {
    timestamps : true,
    versionKey : '__v'
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = {
    Blog
}