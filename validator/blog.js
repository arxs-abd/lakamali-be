const Joi = require('joi')

const blogSchema = Joi.object({
    'title' : Joi.string().required(),
    'content' : Joi.string().required(),
    'thumbnail' : Joi.string().required(),
    'category' : Joi.string().required(),
})

const blogPublicSchema = Joi.object({
    'title' : Joi.string().required(),
    'content' : Joi.string().required(),
    'thumbnail' : Joi.string().required(),
    'category' : Joi.string().required(),
    'user' : Joi.string().required(),
})

const validateBlog = (req, res, next) => {
    const {error} = blogSchema.validate(req.body)
    if (error) res.status(422).send({
        status : 'fail',
        error : error.details[0].message
    })
    else next()
}
const validatePublicBlog = (req, res, next) => {
    const {error} = blogPublicSchema.validate(req.body)
    if (error) res.status(422).send({
        status : 'fail',
        error : error.details[0].message
    })
    else next()
}

module.exports = {
    validateBlog,
    validatePublicBlog
}