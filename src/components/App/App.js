import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { createContext, useReducer } from "react";
import CharacterReducer from "../../reducers/CharacterReducer";
import { Characters } from "../Characters";
import { ImportCharacterForm } from "../ImportCharacter";
import { SpellBook } from "../SpellBook";
import { Spells } from "../Spells";
import { Item } from "../Item";
import { Inventory } from "../Inventory";
import { Currencies } from "../Currencies";
import { PersonalBelongings } from "../PersonalBelongings";
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
                  {character.data.classes.map((characterClass,key) => {
                    return (
                      <SpellBook 
                        cantripsKnown={characterClass.definition.spellRules.levelCantripsKnownMaxes[characterClass.level]}
                        spellsKnown={characterClass.definition.spellRules.levelSpellKnownMaxes[characterClass.level]}
                        spellSlots={characterClass.definition.spellRules.levelSpellSlots[characterClass.level]}
                      >
                        {character.data.classSpells.map((classSpells, key) => {
                          return classSpells.spells.map((spell, key) => {
                            return (
                              <>
                                <Spells
                                  key={key}
                                  name={spell.definition.name}
                                  time={spell.activation.activationType}
                                  lvl={spell.definition.level}
                                  duration={
                                    spell.definition.duration.durationUnit
                                      ? spell.definition.duration
                                          .durationInterval +
                                        " " +
                                        spell.definition.duration.durationUnit
                                      : null
                                  }
                                  range={
                                    spell.definition.range.rangeValue
                                      ? spell.definition.range.rangeValue
                                      : spell.definition.range.origin
                                  }
                                  components={spell.definition.components}
                                  DC={spell.definition.saveDcAbilityId}
                                ></Spells>
                              </>
                            );
                          });
                        })}
                        ;
                      </SpellBook>
                    );
                  })}
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
                              ? item.definition.damage.diceString + " " + item.definition.damageType: null
                            }
                            properties={
                              item.definition.properties
                              ? item.definition.properties: null
                            }
                          ></Item>
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
                    <PersonalBelongings>
                      {character.data.notes.personalPossessions}
                    </PersonalBelongings>
                  </Inventory>
                </>
              );
            })}
            <ImportCharacterForm></ImportCharacterForm>
            <Characters characters={state.characters}></Characters>
          </content>
        </StoreContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
