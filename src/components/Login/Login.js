import React, {Component} from 'react'
import logo from './communityBank.svg'
import './Login.css'
import axios from 'axios'

export default class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      password: '' ,
      email: '' ,
      loggedIn: false
    }
    this.testState = this.testState.bind(this)
  }

  testState(){
    console.log(this.state)
  }

  async buttonClick(buttonValue){
    let res = await axios.post(`/auth/${buttonValue}` , this.state)
    if(res.data.id){
      this.setState({loggedIn: true})
      this.props.history.push('/private')
    }
    else {
      alert(res.data.message)
    }
  }

  render(){
    return(
      <>
      <img src={logo} alt='this is logo' />
      <div className='field-master'>
      <p>
        <div className='field-container align-right'>Email: </div>
        <div className='field-container align-right'>Password: </div>
      </p>
      <p>
        <div className='field-container'>
          <input 
          onChange={(e) => this.setState({email: e.target.value})}
          type="text"/>
        </div>
        <div className='field-container'>
          <input 
          onChange={(e) => this.setState({password: e.target.value})}
          type="text"/>
        </div>
      </p>
      </div>
      <button
        onClick={() => {this.buttonClick('register')}}
      >Register</button>
      <button
        onClick={() => {this.buttonClick('login')}}
      >Login</button>
      
      </>
    )
  }
  
}