import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { createContext, useReducer } from "react";
import reducer from "../../reducers/reducer";
import { Characters } from "../Characters";
import { ImportCharacterForm } from "../ImportCharacter";
import "./App.css";
import { CharacterCard } from "../CharacterCard";

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
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <StoreContext.Provider value={{ state, dispatch }}>
          <content className="App-content useContext">
            <ImportCharacterForm></ImportCharacterForm>
            <Characters characters={state.characters}></Characters>
            <CharacterCard
              avatar="https://i.pinimg.com/originals/48/62/d6/4862d6cf097183b89d6b04c83fe681fb.jpg"
              name="Oz de Mezro"
              race="Tiefling"
              currentHp="50"
              hpMax="75"
              ac="15"
              conditions="Charmed"
              charClass="Bard"
              levels="10"
              experience="64000"
              gender="Male"
            ></CharacterCard>
          </content>
        </StoreContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
