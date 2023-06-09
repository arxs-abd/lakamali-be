const { Blog } = require("../models/blog")
const { BlogPublic } = require('../models/blog_public')
const xslug = require('slug')

const viewAll = async (req, res) => {
    const allBlog = await Blog.find().catch(err => {
        return res.send({
            status : 'error',
            msg : 'Failed Get Blog',
            data : err
        })    
    })

    return res.send({
        status : 'success',
        msg : 'Successfully Get Blog',
        data : allBlog
    })
}

const viewByCategory = async (req, res) => {
    const {category} = req.params
    
    const allBlog = await Blog.find({
        category
    }).catch(err => {
        return res.status(400).send({
            status : 'error',
            msg : 'Failed Get Blog',
            data : err
        })    
    })

    return res.send({
        status : 'success',
        allBlog
    })
}

const viewById = async (req, res) => {
    const allBlog = await Blog.find({
        id_user : req.user.id
    }).catch(err => {
        return res.status(400).send({
            status : 'error',
            msg : 'Failed Get Blog',
            data : err
        })    
    })
    return res.send({
        status : 'success',
        msg : 'Successfully Get Blog',
        data : allBlog
    })
}

const addBlog = async (req, res) => {
    const {title, content, thumbnail, category} = req.body
    const slug = xslug(title.toLowerCase())
    const data = {slug, title, content, id_user : req.user.id, thumbnail, category}

    const newBlog = new Blog(data)
    await newBlog.save().catch(err => {
        return res.send({
            status : 'error',
            msg : err
        })
    })

    return res.send({
        status : 'successfully',
        msg : 'Blog Added'
    })
}

const viewBlogBySlug = async (req, res) => {
    const slug = req.params.slug
    const blog = await Blog.findOne({
        slug
    })

    if (!blog) return res.status(404).send({
        status : 'error',
        msg : 'Blog Not Found'
    })
    
    return res.send({
        result : blog
    })
}

const updateBlog = async (req, res) => {
    const idUser = req.user.id
    const { id, title, content, thumbnail, category } = req.body
    const userBlog = await Blog.findOne({
        _id : id
    })
    
    if (userBlog.id_user !== idUser) return res.status(403).send({
        status : 'error',
        msg : 'Unathorized Author of Blog'
    })

    const slug = xslug(title?.toLowerCase())

    userBlog.title = title ?? userBlog.title
    userBlog.content = content ?? userBlog.content
    userBlog.slug = slug ?? userBlog.slug
    userBlog.thumbnail = thumbnail ?? userBlog.thumbnail
    userBlog.category = category ?? userBlog.category

    await userBlog.save().catch(err => {
        return res.send({
            status : 'error',
            msg : 'Blog Fail to Update'
        })
    })

    return res.send({
        status : 'successfull',
        msg : 'Blog Has Been Updated'
    })

}

const deleteBlog = async (req, res) => {
    const {id} = req.body
    const idUser = req.user.id
    const blog = await Blog.findOne({
        _id : id
    })

    if (blog.id_user !== idUser) return res.status(403).send({
        status : 'error',
        msg : 'Unathorized Author of Blog'
    })

    await blog.remove().catch(err => {
        return res.send({
            status : 'error',
            msg : 'Blog Fail to Remove'
        })
    })

    return res.send({
        status : 'successfull',
        msg : 'Blog Has Been Deleted'
    })
    
}

const addBlogByPublic = async (req, res) => {
    const {title, content, thumbnail, category, user} = req.body
    const slug = xslug(title.toLowerCase())
    const status = 'review'
    const data = {slug, title, content, user, thumbnail, category, status}

    const newBlogPublic = new BlogPublic(data)
    await newBlogPublic.save().catch(err => {
        return res.send({
            status : 'error',
            msg : err
        })
    })

    return res.send({
        status : 'successfully',
        msg : 'Blog Added'
    })
}

const getPublicBlogList = async (req, res) => {
    const allPublicBlog = await BlogPublic.find().catch(err => {
        return res.send({
            status : 'error',
            msg : 'Failed Get Blog',
            data : err
        })    
    })
    return res.send({
        status : 'success',
        msg : 'Successfully Get Blog',
        data : allPublicBlog
    })
}

const accPublicBlog = async (req, res) => {
    const {publicBlog : id, review} = req.params

    const publicBlog = await BlogPublic.findById(id).catch(err => {
        return res.send({
            status : 'error',
            msg : 'Failed Get Blog',
            data : err
        })
    })

    if (!publicBlog) return res.status(404).send({
        status : 'error',
        msg : 'Blog not found'
    })

    if (review === 'accept') {
        // publicBlog.hasAccept = true
        publicBlog.status = 'accept'
        const {_id : id, title, slug, content, user, category} = publicBlog
        const data = {id_public : id, title, slug, content, user, category}
        const newBlog = new Blog(data)
        await newBlog.save().catch(err => {
            return res.send({
                status : 'error',
                msg : err
            })
        })
    }
    // else if (review === 'reject') publicBlog.hasAccept = false
    else if (review === 'reject') publicBlog.status = 'reject'
    else return res.status(404).send({
        status : 'fail',
        message : 'Wrong Request'
    })
    await publicBlog.save()

    return res.send({
        status : 'success',
        message : 'Blog Has Been ' + review
    })
}

const viewPublicById = async (req, res) => {
    const {id} = req.params
    const blog = await BlogPublic.findById(id).catch(err => {
        return res.status(400).send({
            status : 'error',
            msg : 'Failed Get Blog',
            data : err
        })    
    })
    return res.send({
        status : 'success',
        result : blog
    })
}

const deletePublicBlog = async (req, res) => {
    const {id} = req.body
    const blog = await BlogPublic.findOne({
        _id : id
    })

    await blog.remove().catch(err => {
        return res.send({
            status : 'error',
            msg : 'Public Blog Fail to Remove'
        })
    })

    return res.send({
        status : 'successfull',
        msg : 'Public Blog Has Been Deleted'
    })
    
}

module.exports = {
    viewAll,
    viewById,
    addBlog,
    viewBlogBySlug,
    updateBlog,
    deleteBlog,
    viewByCategory,
    addBlogByPublic,
    getPublicBlogList,
    accPublicBlog,
    viewPublicById,
    deletePublicBlog,
}