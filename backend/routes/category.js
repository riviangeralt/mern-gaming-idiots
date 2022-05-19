const express = require('express')
const router = express.Router()

const { create } = require('../controllers/catController.js')
const { requireSignin, isAuth, isAdmin } = require('../controllers/authController.js')
const { userById } = require('../controllers/userController.js')


router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create)
router.param('userId', userById)


module.exports = router