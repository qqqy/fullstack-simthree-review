import React, { Component } from 'react';
import './App.css';
import { HashRouter , Route , Switch } from 'react-router-dom'
import Private from './components/Private/Private';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
      <HashRouter>

      <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/private' component={Private} />
      </Switch>
      </HashRouter>
      </div>
    );
  }
}

export default App;
