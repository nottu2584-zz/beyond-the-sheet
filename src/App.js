import Box from "@material-ui/core/Box";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  useTheme,
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
  Status,
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
    display: "block",
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

  const abilities = (
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
  );

  const status = (
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
  );

  const inventory = (
    <GroupInventory characters={state.characters}></GroupInventory>
  );

  const currencies = (
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
  );

  const spells = (
    <>
      <SpellBook characters={state.characters}></SpellBook>
    </>
  );

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
                {abilities}
              </TabPanel>
              <TabPanel value={tab} index={1} dir={theme.direction}>
                {status}
              </TabPanel>
              <TabPanel value={tab} index={2} dir={theme.direction}>
                {inventory}
              </TabPanel>
              <TabPanel value={tab} index={3} dir={theme.direction}>
                {currencies}
              </TabPanel>
              <TabPanel value={tab} index={4} dir={theme.direction}>
                {spells}
              </TabPanel>
            </SwipeableViews>
          </content>
        </StoreContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
