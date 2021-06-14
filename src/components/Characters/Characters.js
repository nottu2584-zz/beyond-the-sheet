import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import PropTypes from "prop-types";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { Abilities, Currencies, SpellBook, Spells } from "../";
import { GroupAbilities } from "../GroupAbilities";
import { GroupCurrencies } from "../GroupCurrencies";
import { GroupInventory } from "../GroupInventory";
import { GroupStatus } from "../GroupStatus";
import { Status, StatusCard } from "../Status";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

const Characters = (props) => {
  const { characters } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <Paper elevation={3}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Abilities" {...a11yProps(0)} />
          <Tab label="Status" {...a11yProps(1)} />
          <Tab label="Inventory" {...a11yProps(2)} />
          <Tab label="Currencies" {...a11yProps(3)} />
          <Tab label="Spells" {...a11yProps(4)} />
        </Tabs>
        <LinearProgress />
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <GroupAbilities>
              {characters.map((character, key) => {
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
          <TabPanel value={value} index={1} dir={theme.direction}>
            <GroupStatus>
              {characters.map((character, key) => {
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
          <TabPanel value={value} index={2} dir={theme.direction}>
            <GroupInventory characters={characters}></GroupInventory>
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <GroupCurrencies characters={characters}>
              {characters.map((character, key) => {
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
          <TabPanel value={value} index={4} dir={theme.direction}>
            <SpellBook characters={characters}></SpellBook>
          </TabPanel>
        </SwipeableViews>
      </Paper>


    </>
  );
};

export default Characters;
