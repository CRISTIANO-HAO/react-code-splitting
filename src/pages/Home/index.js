import React, { Component } from 'react';
import logo from './../../logo.svg';
import './App.css';
import { routesConfig } from './../../routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p> </p>
          <a
            className="App-link"
            href={routesConfig[1]['link']}
            rel="noopener noreferrer"
          >
            Learn React Router, Let's go !!
          </a>
        </header>
      </div>
    );
  }
}

export default App;
