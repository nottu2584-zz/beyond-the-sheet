import React from 'react';
import logo from '../../images/logo.svg';
import './App.css';
import { ImportCharacterForm } from '..';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <ImportCharacterForm></ImportCharacterForm>
        </div>
      </header>
    </div>
  );
}

export default App;
