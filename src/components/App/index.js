import React, { useReducer } from "react";
import logo from "../../images/logo.svg";
import "./App.css";

const initialState = {
  data: {},
  characters: [],
};

const StoreContext = React.createContext(initialState);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
      </header>
      <StoreContext.Provider value={{ state, dispatch }}>
        <content></content>
      </StoreContext.Provider>
    </div>
  );
}

export default App;
