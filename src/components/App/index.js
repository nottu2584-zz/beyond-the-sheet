import React from 'react';
import logo from '../../images/logo.svg';
import './App.css';
import { CharacterStats } from '../';

function App() {

  const initialStats = {
    strenght: 10,
    dexterity: 10,
    constituion: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <CharacterStats
          strenght="10"
          dexterity="10"
          constitution="10"
          intelligence="10"
          wisdom="10"
          charisma="10"
        ></CharacterStats>
        <CharacterStats
          strenght={initialStats.strenght}
          dexterity={initialStats.dexterity}
          constitution={initialStats.constituion}
          intelligence={initialStats.intelligence}
          wisdom={initialStats.wisdom}
          charisma={initialStats.charisma}
        ></CharacterStats>
        <CharacterStats
          {...initialStats}
        ></CharacterStats>
      </header>
    </div>
  );
}

export default App;
