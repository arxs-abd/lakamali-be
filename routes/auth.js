const express = require('express')
const { login, register, logout } = require('../controller/auth')
const { loginValidator, registerValidator, authenticate } = require('../middleware/auth')
const router = express.Router()

router.post('/api/login', loginValidator, login)
router.post('/api/register', registerValidator, register)
router.post('/api/logout', authenticate, logout)

module.exports = router