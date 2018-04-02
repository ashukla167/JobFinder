import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FindJob from './findjob';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <div>
      <MuiThemeProvider>
        <div className="App">
        <header className="App-header">
          Find Job
        </header>

        <div><FindJob /></div>
      </div>
      </MuiThemeProvider></div>
    );
  }
}

export default App;
