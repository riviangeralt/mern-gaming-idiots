const express = require('express')
const router = express.Router()

const { requireSignin, isAuth } = require('../controllers/authController.js')
const { userById } = require('../controllers/userController.js')
const { generateToken, processPayment } = require('../controllers/braintreeController.js')

router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken)
router.post('/braintree/payment/:userId', requireSignin, isAuth, processPayment)
router.param('userId', userById)




module.exports = router