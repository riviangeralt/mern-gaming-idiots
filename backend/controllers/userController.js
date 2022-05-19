const User = require('../models/userModel')

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({ message: 'User not found' })
        }
        req.profile = user
        next()
    })
}

exports.userByIdDelete = (req, res, next, id) => {
    User.findByIdAndDelete(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({ message: 'User not found' })
        }
        res.status(200).json({ message: 'User  Deleted Successfully!', user })
        next()
    })
}

