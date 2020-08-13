import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { createContext, useReducer } from "react";
import CharacterReducer from "../../reducers/CharacterReducer";
import { CharacterStats } from "../CharacterStats";
import { ImportCharacterForm } from "../ImportCharacter";
import { SpellBook } from "../SpellBook";
import { Spells } from "../Spells";
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
            {state.characters.map((character,key) => {
              return (
                <>
                  <CharacterStats
                    key={key}
                    strength={character.stats.strength}
                    dexterity={character.stats.dexterity}
                    constitution={character.stats.constitution}
                    intelligence={character.stats.intelligence}
                    wisdom={character.stats.wisdom}
                    charisma={character.stats.charisma}
                  ></CharacterStats>
                  <SpellBook>
                    {character.data.classSpells.map((classSpells,key) => {
                      return classSpells.spells.map((spell,key) => {
                        return (
                          <>
                            <Spells
                              key={key}
                              name={spell.definition.name}
                              time={spell.activation.activationType}
                              lvl={spell.definition.level}
                              duration={
                                spell.definition.duration.durationUnit
                                ? spell.definition.duration.durationInterval + " " + spell.definition.duration.durationUnit
                              :null}
                              range={
                                spell.definition.range.rangeValue
                                ? spell.definition.range.rangeValue
                                : spell.definition.range.origin}
                              components={spell.definition.components}
                              DC={spell.definition.saveDcAbilityId}
                            ></Spells>
                          <br></br>
                          </>
                        );
                      })
                    })};
                  </SpellBook>
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
