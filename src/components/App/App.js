import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { createContext, useReducer } from "react";
import reducer from "../../reducers/reducer";
import { Characters } from "../Characters";
import { ImportCharacterForm } from "../ImportCharacter";
import "./App.css";
import { CharacterCard } from "../CharacterCard";
import { CharacterTooltip } from "../CharacterTooltip";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export const initialState = {
  data: {},
  characters: [],
  loading: true
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
            <Characters
              characters={state.characters}
              loading={state.loading}
            ></Characters>
            <CharacterTooltip
              avatar="https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/facebook_share/public/Purina%C2%AE%20La%20llegada%20del%20gatito%20a%20casa.jpg?itok=6QG07anP"
              characterName="Gatito"
              name="Gatito"
              race="Europeo"
              currentHp="3"
              hpMax="15"
              ac="11"
              conditions="--"
              charClass="Rogue"
              levels={1}
              experience={50}
              gender="Male"
            >
            </CharacterTooltip>
          </content>
        </StoreContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
