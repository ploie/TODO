require('dotenv').config()
//naakosho rindu pievienoju 18_5_2025
console.log(process.env)

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
//const port = process.env.PORT || 3001

//  Start server
app.listen(port)