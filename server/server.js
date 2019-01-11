require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const { SESSION_SECRET , CONNECTION_STRING , SERVER_PORT } = process.env
const aCtrl = require('./authController')

const app = express()

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET ,
  resave: false ,
  saveUninitialized: false
}))

// TEST ENDPOINT //

app.get('/api/test' , (req , res) => res.sendStatus(200))

// FUNCTIONAL ENDPOINTS //

app.post('/auth/register' , aCtrl.register)
app.post('/auth/login' , aCtrl.login)
app.get('/api/user-data' , aCtrl.userData)
app.delete('/api/logout' , aCtrl.logout)

massive(CONNECTION_STRING).then((instance) => {
  app.set('db' , instance)
  console.log('DB online')
  app.listen(SERVER_PORT , () => {console.log(SERVER_PORT , ' is our port in a storm')})
})

module.exports = {
  app
}
