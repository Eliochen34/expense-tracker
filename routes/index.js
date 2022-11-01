const express = require('express')
const router = express.Router()

const home = require('./modules/home')
// const records = require('./modules/records')
const users = require('./modules/users')
// const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth') // 掛載 middleware

// router.use('/records', authenticator, records) // 將網址結構符合 /todos字串開頭的request導向todos模組
router.use('/users', users)
// router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router