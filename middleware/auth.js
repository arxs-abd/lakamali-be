const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { User } = require('../models/user')

const loginValidator = [
    check('email').isEmail(),
    check('password').isLength({min : 8}).withMessage('Minimum password is 8 characters'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) return next()
        return res.status(400).send(errors)
    }
]

const registerValidator = [
    check('email').isEmail().bail().custom( async (value) => {
        const email = await User.find({email : value})
        if (email.length !== 0) throw new Error('Email is already in use')
        return true 
    }),
    check('password').isLength({min : 8}).withMessage('Minimum password is 8 characters'),
    check('passwordConfirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true
    }),
    (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) return next()
        return res.status(400).send(errors)
    }
]

const authenticate = (req, res, next) => {
    const token = req.cookies['x-access-token'] ?? req.body.token
    if (!token) return res.status(401).send({
        status : 'error',
        msg : 'Token Not Found'
    })

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, result) => {
        if (err) return res.status(403).send({
          status: "error",
          msg: "The token you entered is invalid or has expired. Please try again with a valid token.",
        });
        req.user = result
        next()
    })
}

module.exports = {
    loginValidator,
    registerValidator,
    authenticate
}