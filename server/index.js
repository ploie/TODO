require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { todoRouter } = require('./routes/todo.js')

//const { query } = require('./helpers/db')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/',todoRouter)

const port = process.env.PORT

//  Start server
app.listen(port)