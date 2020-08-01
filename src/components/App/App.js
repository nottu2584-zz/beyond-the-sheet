import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { createContext, useReducer } from 'react';
import CharacterReducer from '../../reducers/CharacterReducer';
import { CharacterStats } from '../CharacterStats';
import { ImportCharacterForm } from '../ImportCharacter';
import './App.css';

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export const initialState = {
  data: {},
  characters: [],
};

const initialStats = {
  strenght: 18,
  dexterity: 15,
  constitution: 16,
  intelligence: 11,
  wisdom: 8,
  charisma: 9
}

export const StoreContext = createContext(initialState);

const App = () => {
  const [state, dispatch] = useReducer(CharacterReducer, initialState);

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <StoreContext.Provider value={{ state, dispatch }}>
          <content className="App-content useContext">
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <ImportCharacterForm dispatch={dispatch}></ImportCharacterForm>
            <CharacterStats {...initialStats}></CharacterStats>
          </content>
        </StoreContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
