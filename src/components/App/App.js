import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { createContext, useReducer } from "react";
import CharacterReducer from "../../reducers/CharacterReducer";
import { Characters } from "../Characters";
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
            <Characters characters={state.characters}></Characters>
          </content>
        </StoreContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
