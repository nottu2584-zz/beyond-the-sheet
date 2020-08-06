import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { createContext, useReducer } from "react";
import CharacterReducer from "../../reducers/CharacterReducer";
import { CharacterStats } from "../CharacterStats";
import { ImportCharacterForm } from "../ImportCharacter";
import "./App.css";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export const initialState = {
  data: {},
  characters: [],
};

export const StoreContext = createContext(initialState);

const App = () => {
  const [state, dispatch] = useReducer(CharacterReducer, initialState);

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <StoreContext.Provider value={{ state, dispatch }}>
          <content className="App-content useContext">
            <ImportCharacterForm dispatch={dispatch}></ImportCharacterForm>
            {state.characters.map((character,key) => {
              return (
                <CharacterStats
                  key={key}
                  strenght={character.data.stats[0].value}
                  dexterity={character.data.stats[1].value}
                  constitution={character.data.stats[2].value}
                  intelligence={character.data.stats[3].value}
                  wisdom={character.data.stats[4].value}
                  charisma={character.data.stats[5].value}
                ></CharacterStats>
              );
            })}
          </content>
        </StoreContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
