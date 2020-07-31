import React, { useReducer } from "react";
import logo from "../../images/logo.svg";
import "./App.css";
import { parser } from "../../reducers";

const initialState = {
  data: {},
  characters: [],
};

const StoreContext = React.createContext(initialState);

const App = () => {
  const [state, dispatch] = useReducer(parser, initialState);

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
};

export default App;