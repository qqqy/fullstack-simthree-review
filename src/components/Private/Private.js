import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {loadAccount , unloadAccount} from '../../ducks/user'
import './Private.css'

class Private extends Component{

  async componentDidMount(){
    try {
      const res = await axios.get('/api/user-data')
      this.props.loadAccount(res.data)
    } catch(e) {
      console.log('Error: not logged in' , e)
      this.logout()
    }

  }

  balance(){
    return Math.floor((Math.random() + 1) * 1000)
  }

  async logout(){
    const res = await axios.delete('/api/logout')
    this.props.unloadAccount()
    this.forceUpdate()
    setTimeout(() => {
      this.props.history.push('/')
    }, 1500);
  }

  render(){
    console.log(this.props)
    const {id, email} = this.props.user
    return(
      <>
        <h1>Account Summary</h1>
        <hr />
        <hr />
        <hr />
        {
          id ? (
            <div>
              <p>Account Name: ThrashMaster</p>
              <p>Account Email: {email}</p>
              <p>Account ID: {id}</p>
              <p>Balance: ${this.balance()}.00</p>
              <button
                onClick={() => this.logout()}
              >LogOut</button>
            </div>
          ) : (<>

                <p>Logged-Out! Returning to Login...</p>
                <button onClick={() => this.props.history.push('/')}>Return</button>
                <div className="timeout">
                  <div className="timeout-bar" ></div>
                </div>
              </>
            )
        }
      </>
    )
  }
  
}

const mapState = (reduxState) => reduxState;

export default connect(mapState, {loadAccount , unloadAccount})(Private);