import React, { Component } from 'react';
import AppContainer from './components/AppContainer/AppContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className='left-align'>Dojo Dossier</h1>
        <AppContainer />
      </div>
    );
  }
}

export default App;
