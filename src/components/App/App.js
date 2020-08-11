import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { createContext, useReducer } from "react";
import CharacterReducer from "../../reducers/CharacterReducer";
import Character from "../Character/Character";
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
            <ImportCharacterForm></ImportCharacterForm>
            {state.characters.map((character, key) => {
              return (
                <>
                  <Character
                    avatar={character.data.avatarUrl}
                    name={character.data.name}
                    characterRace={
                      character.data.race.isSubrace
                        ? character.data.race.fullName +
                          " (" +
                          character.data.race.baseRaceName +
                          ")"
                        : character.data.race.baseRaceName
                    }
                  ></Character>
                  <CharacterStats
                    key={key}
                    strength={character.stats.strength}
                    dexterity={character.stats.dexterity}
                    constitution={character.stats.constitution}
                    intelligence={character.stats.intelligence}
                    wisdom={character.stats.wisdom}
                    charisma={character.stats.charisma}
                  ></CharacterStats>
                </>
              );
            })}
          </content>
        </StoreContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
