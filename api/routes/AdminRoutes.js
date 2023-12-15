const express = require('express')
const router = express.Router()
const {login, logout, loggedin} = require('../controllers/AdminController')

router.post('/login', login)
router.get('/logout', logout)
router.get('/loggedin', loggedin)

module.exports = router