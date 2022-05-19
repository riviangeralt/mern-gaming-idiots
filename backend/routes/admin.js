const express = require('express')
const router = express.Router()
const { allUsers, usersData, authUser } = require('../controllers/adminController')

const { requireSignin, isAuth, isAdmin } = require('../controllers/authController.js')
const { userById, userByIdDelete } = require('../controllers/userController.js')

router.get('/admin/:userId', requireSignin, isAuth, isAdmin, allUsers)
router.get('/users/:userId', requireSignin, isAuth, isAdmin, usersData)
router.get('/users/:userId/:authUser', requireSignin, isAuth, isAdmin)
router.delete('/delete/:userId/:delId', requireSignin, isAuth, isAdmin)

router.param('userId', userById)
router.param('authUser', authUser)
router.param('delId', userByIdDelete)

module.exports = router