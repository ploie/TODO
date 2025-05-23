require('dotenv').config();
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

// pievienoju delete task
//23_05_2025

app.delete("/delete/:id", async(req,res)=> {
  const pool = openDb()
const id = parseInt(req.params.id)
pool.query('delete from task where id = $1',
  [id],
  (error,result) => {
    if (error) {
      res.status(500).json({error: error.message})
    } else {
      res.status(200).json({id:id})
    }
  })

})

const port = process.env.PORT
//const port = process.env.PORT || 3001

//  Start server
app.listen(port)