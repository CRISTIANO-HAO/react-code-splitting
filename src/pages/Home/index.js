import React, { Component } from 'react';
import logo from './../../logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="/react-router"
            rel="noopener noreferrer"
          >
            Learn React Router
          </a>
        </header>
      </div>
    );
  }
}

export default App;
