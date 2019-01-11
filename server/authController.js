const bcrypt = require('bcryptjs')
const { app } = require('./server')

module.exports = {
  async register(req, res) {
    const db = req.app.get('db')
    const account = await db.find_acc_email(req.body).catch(err => res.status(555).send(err))
    if (account[0]){return res.status(401).send({message: 'Username in use!'})}
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.email , salt)
    const registered = await db.register_acc({...req.body , hash}).catch(err => res.status(555).send(err))
    req.session.user = {id: registered[0].acc_id , email: registered[0].acc_email}
    res.status(201).send(req.session.user)
  } ,

  async login(req , res){
    const db = req.app.get('db')
    const account = await db.find_acc_email(req.body)
    if(!account[0]){return res.status(200).send({message: 'No account found'})}
    const authorized = bcrypt.compareSync(req.body.password , account[0].acc_hash)
    if(!authorized){return res.status(401).send({message: 'Incorrect email or password'})}
    req.session.user = {id: account[0].acc_id , email: account[0].acc_email}
    res.status(200).send(req.session.user)
  } ,

  userData: (req , res) => {
    if(req.session.user){
      res.status(200).send(req.session.user)
    } else {
      res.status(401).send({message: 'Please Log In'})
    }
  } ,

  logout: (req, res) => {
    req.session.destroy()
    res.status(200).send({message: 'logged-out'})
  }
}