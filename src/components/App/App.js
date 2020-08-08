import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { createContext, useReducer } from "react";
import CharacterReducer from "../../reducers/CharacterReducer";
import { CharacterStats } from "../CharacterStats";
import { ImportCharacterForm } from "../ImportCharacter";
import { Item } from "../Item";
import { Inventory } from "../Inventory"
import { Currencies } from "../Currencies"
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
            {state.characters.map((character, key) => {
              return (
                <>
                  <CharacterStats
                    key={key}
                    strenght={character.data.stats[0].value}
                    dexterity={character.data.stats[1].value}
                    constitution={character.data.stats[2].value}
                    intelligence={character.data.stats[3].value}
                    wisdom={character.data.stats[4].value}
                    charisma={character.data.stats[5].value}
                  ></CharacterStats>
                  <Inventory
                  key={key}
                  >
                    {character.data.inventory.map((item, key) => {
                      return (
                        <>
                          <Item
                            key={key}
                            name={item.definition.name}
                            weight={
                              item.definition.weight === 0
                              ? "--": item.definition.weight}
                            cost={
                              item.definition.cost
                            ? item.definition.cost : "--"}
                            rarity={item.definition.rarity}
                            quantity={
                              item.definition.stackable === true
                              ? item.quantity: "--"}
                            armorClass={
                              item.definition.armorClass
                              ? item.definition.armorClass: null}
                            type={item.definition.filterType}
                            damageDice={
                              item.definition.damage
                              ? item.definition.damage.diceString: null
                            }
                            description={item.definition.description}
                            properties={
                              item.definition.properties
                              ? item.definition.properties: null
                            }
                          >
                            {console.log("Prueba Items" , key)}
                          </Item>
                          <br/>
                        </>  
                      );
                    })}
                    <Currencies
                      cp={character.data.currencies.cp}
                      sp={character.data.currencies.sp}
                      ep={character.data.currencies.ep}
                      gp={character.data.currencies.gp}
                      pp={character.data.currencies.pp}
                    ></Currencies>
                  </Inventory>
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
