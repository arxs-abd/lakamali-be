require('../utils/db')
const mongoose = require('mongoose')

const blogPublicSchema = new mongoose.Schema({
    user : {
        type : String,
        required : true,
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
    },
    hasAccept : {
        type : Boolean
    },
    status : {
        type : String,
        required : true
    }
}, {
    timestamps : true,
    versionKey : '__v'
})

const BlogPublic = mongoose.model('BlogPublic', blogPublicSchema)

module.exports = {
    BlogPublic
}