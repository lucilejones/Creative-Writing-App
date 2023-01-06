const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { expressjwt } = require('express-jwt')

process.env.SECRET

// middleware
app.use(express.json())
app.use(morgan('dev'))

// connect to the database
mongoose.connect(
    process.env.MONGO_URL,
    () => console.log("Connected to the Database")
)

// mongoose.connect(
//     'mongodb://localhost:27017/creative-writing-db',
//     () => console.log("Connected to the Database")
// )

// routes
app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/api/entry', require('./routes/entryRouter.js'))
app.use('/api/posted-prompt', require('./routes/postedPromptRouter.js'))
app.use('/api/saved-prompt', require('./routes/savedPromptRouter.js'))
app.use('/api/comment', require('./routes/commentRouter.js'))


// error handler
app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})

// server listen
app.listen(8000, () => {
    console.log("Server is running on local port 8000")
})