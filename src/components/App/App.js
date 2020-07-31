import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { useReducer } from "react";
import { parser } from "../../reducers";
import ImportCharacterForm from "../ImportCharacter";
import "./App.css";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const initialState = {
  data: {},
  characters: [],
};

const StoreContext = React.createContext(initialState);

const App = () => {
  const [state, dispatch] = useReducer(parser, initialState);

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <StoreContext.Provider value={{ state, dispatch }}>
          <content className="App-content">
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <ImportCharacterForm></ImportCharacterForm>
          </content>
        </StoreContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
