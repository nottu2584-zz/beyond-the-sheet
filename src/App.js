import Box from "@material-ui/core/Box";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  useTheme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React, { createContext, useReducer, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import "./App.css";
import {
  Abilities,
  Currencies,
  GroupAbilities,
  GroupCurrencies,
  GroupInventory,
  GroupStatus,
  ImportCharacterForm,
  Navigation,
  SpellBook,
  Spells,
  Status
} from "./components";
import reducer from "./reducers/reducer";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block'
  },
}));

export const initialState = {
  data: {},
  characters: [],
  loading: true,
};

export const StoreContext = createContext(initialState);

const App = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleChangeIndex = (index) => {
    setTab(index);
  };

  return (
    <div className="App" className={classes.root}>
      <ThemeProvider theme={darkTheme}>
        <Navigation tab={tab} handleChange={handleChange} />
        <StoreContext.Provider value={{ state, dispatch }}>
          <content className="App-content useContext">
            <ImportCharacterForm></ImportCharacterForm>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={tab}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={tab} index={0} dir={theme.direction}>
                <GroupAbilities>
                  {state.characters?.map((character, key) => {
                    return (
                      <Abilities
                        key={key}
                        avatar={character.data.avatarUrl}
                        characterName={character.data.name}
                        race={character.data.race.baseRaceName}
                        hitPoints={character.hitPoints}
                        armorClass={character.armorClass}
                        conditions={character.conditions}
                        experience={character.experience}
                        levels={character.levels}
                        gender={character.data.gender}
                        abilities={character.abilities}
                        initiative={character.initiative}
                        savingThrows={character.savingThrows}
                        skills={character.skills}
                      ></Abilities>
                    );
                  })}
                </GroupAbilities>
              </TabPanel>
              <TabPanel value={tab} index={1} dir={theme.direction}>
                <GroupStatus>
                  {state.characters?.map((character, key) => {
                    return (
                      <Status
                        avatar={character.data.avatarUrl}
                        characterName={character.data.name}
                        key={key}
                        hitPoints={character.hitPoints}
                        race={character.data.race.baseRaceName}
                        levels={character.levels}
                        gender={character.data.gender}
                        armorClass={character.armorClass}
                        experience={character.experience}
                        conditions={character.conditions}
                      ></Status>
                    );
                  })}
                </GroupStatus>
              </TabPanel>
              <TabPanel value={tab} index={2} dir={theme.direction}>
                <GroupInventory characters={state.characters}></GroupInventory>
              </TabPanel>
              <TabPanel value={tab} index={3} dir={theme.direction}>
                <GroupCurrencies characters={state.characters}>
                  {state.characters?.map((character, key) => {
                    return (
                      <Currencies
                        key={key}
                        avatar={character.data.avatarUrl}
                        characterName={character.data.name}
                        race={character.data.race.baseRaceName}
                        hitPoints={character.hitPoints}
                        armorClass={character.armorClass}
                        conditions={character.conditions}
                        experience={character.experience}
                        levels={character.levels}
                        gender={character.data.gender}
                        pp={character.data.currencies.pp}
                        gp={character.data.currencies.gp}
                        ep={character.data.currencies.ep}
                        sp={character.data.currencies.sp}
                        cp={character.data.currencies.cp}
                      ></Currencies>
                    );
                  })}
                </GroupCurrencies>
              </TabPanel>
              <TabPanel value={tab} index={4} dir={theme.direction}>
                {state.characters?.map((character, key) => {
                  return character.data.classes.map((characterClass, key) => {
                    return (
                      <SpellBook
                        key={key}
                        cantripsKnown={
                          characterClass.definition.spellRules
                            .levelCantripsKnownMaxes[characterClass.level]
                        }
                        spellsKnown={
                          characterClass.definition.spellRules
                            .levelSpellKnownMaxes[characterClass.level]
                        }
                        spellSlots={
                          characterClass.definition.spellRules.levelSpellSlots[
                            characterClass.level
                          ]
                        }
                        characterName={character.data.name}
                      >
                        {character.data.classSpells.map((classSpells, key) => {
                          return classSpells.spells.map((spell, key) => {
                            return (
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
                            );
                          });
                        })}
                      </SpellBook>
                    );
                  });
                })}
              </TabPanel>
            </SwipeableViews>
          </content>
        </StoreContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
