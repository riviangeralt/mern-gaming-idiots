const express = require('express')
const router = express.Router()

const { create, gameById, allGames } = require('../controllers/gameController.js')
const { requireSignin, isAuth, isAdmin } = require('../controllers/authController.js')
const { userById } = require('../controllers/userController.js')


router.post('/game/create/:userId', requireSignin, isAuth, isAdmin, create)
router.get('/game/view/:id', requireSignin, isAuth, gameById)
router.get('/game/:userId', requireSignin, isAuth, allGames)


router.param('userId', userById)
router.param('id', gameById)


module.exports = router