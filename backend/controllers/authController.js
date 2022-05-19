const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.signup = (req, res) => {
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({ message: errorHandler(err) })
        }
        res.json({ message: 'Signup Success!' })
    })
}

exports.login = (req, res) => {
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'User with that email does not exists.Please signup.'
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({ message: "Email or password doesn't match" })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

        res.cookie('token', token, { expire: new Date() + 9999 })

        const { _id, name, email, role } = user
        return res.json({ token, user: { _id, name, email, role } })
    })
}

exports.signout = (req, res) => {
    res.clearCookie('token')
    res.json({ message: 'Signout Success' })
}

//protected routes

exports.requireSignin = expressJWT({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ['sha1', 'RS256', 'HS256']
})

//authenticated user only
exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if (!user) {
        return res.status(403).json({ message: 'Access Denied!' })
    }
    next()
}

//for Admin only
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({ message: 'Admin Only. Access Denied!' })
    }
    next()
}