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
              avatar="https://d2j8kvlhepn2ch.cloudfront.net/wp-content/uploads/gatito-pequeno-pies-166153.jpg"
              name="Gatito"
              race="Europeo"
              currentHp="3"
              hpMax="15"
              ac="11"
              conditions="--"
              charClass="Rogue"
              levels={1}
              experience={{ currentXp: 150, nextLevelXp: 300, percent: 50}}
              gender="Male"
            ></CharacterCard>
          </content>
        </StoreContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
