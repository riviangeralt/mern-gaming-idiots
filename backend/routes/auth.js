const express = require('express')
const router = express.Router()

const { signup, login, signout } = require('../controllers/authController.js')

router.post('/signup', signup)
router.post('/login', login)
router.get('/signout', signout)



module.exports = router