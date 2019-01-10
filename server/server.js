require('dotenv').config()
const express = require('express')
const massive = require('massive')
const bcrypt = require('bcryptjs')
const { SESSION_SECRET , CONNECTION_STRING , SERVER_PORT } = process.env

const app = express()

app.use(express.json())

// TEST ENDPOINT //

app.get('/api/test' , (req , res) => res.sendStatus(200))

app.listen(SERVER_PORT , () => {console.log(SERVER_PORT , ' is our port in a storm')})

