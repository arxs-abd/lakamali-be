require('../utils/db')
require('dotenv').config()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models/user')


const login = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({
        email
    })

    if (!user) return res.status(403).send({
        status : 'error',
        msg : 'Email not Found'
    })

    if (! await bcryptjs.compare(password, user.password)) return res.status(403).send({
        status : 'error',
        msg : 'Password is Wrong'
    })
    const data = {
        id : user._id,
        username : user.username,
        email, 
    }

    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN)
    res.cookie('x-access-token', accessToken)

    return res.send({
        status : 'success',
        msg : 'Login Successfully',
        accessToken
    })
}

const register = async (req, res) => {
    const {email, password, passwordConfirm} = req.body

    if (password !== passwordConfirm) return res.status(403).send({
        status : 'error',
        msg : 'Password Confirmation is Wrong'
    })

    const username = email.split('@')[0]
    const salt = bcryptjs.genSaltSync(10)
    const newPassword = bcryptjs.hashSync(password, salt)

    const data = { username, email, password : newPassword }
    const newUser = new User(data)
    await newUser.save()
    return res.send({
        status : 'success',
        msg : 'Signup Successfully'
    })
}

const logout =  async (req, res) => {
    res.clearCookie('x-access-token')
    return res.status(200).send({
        status : 'success',
        msg : 'Logout Successfull'
    })
}

module.exports = {
    register,
    login,
    logout
}