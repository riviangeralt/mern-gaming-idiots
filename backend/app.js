const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

//environment variables
const port = process.env.PORT || 8000

//initialize
const app = express()
app.use(cors())
mongoose.connect(process.env.MONGODB).then(() => console.log('DB connected'))

//routes imports
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const gameRoute = require('./routes/game')
const catRoute = require('./routes/category')
const braintreeRoute = require('./routes/braintree')
const orderRoute = require('./routes/order')
const adminRoute = require('./routes/admin')
const cartRoute = require('./routes/cart')

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

//useing routes
app.use('/api', authRoute)
app.use('/api', userRoute)
app.use('/api', gameRoute)
app.use('/api', catRoute)
app.use('/api', braintreeRoute)
app.use('/api', orderRoute)
app.use('/api', adminRoute)
app.use('/api', cartRoute)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})