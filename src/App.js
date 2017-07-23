import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AxistChat from './components/AxistChat.js';


class App extends Component {
  render() {

    return (
      <div className="App">
        <AxistChat />
      </div>
    );
  }
}

export default App;
