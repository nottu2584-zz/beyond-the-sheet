import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import PropTypes from "prop-types";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { Abilities, Currencies, Item, SpellBook, Spells } from "../";
import { GroupCurrencies } from "../GroupCurrencies";
import { GroupInventory } from "../GroupInventory";
import { GroupAbilities } from "../GroupAbilities";

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
        <Tab label="Inventory" {...a11yProps(1)} />
        <Tab label="Currencies" {...a11yProps(2)} />
        <Tab label="Spells" {...a11yProps(3)} />
      </Tabs>
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
                  name={character.data.name}
                  abilities={character.abilities}
                  skills={character.skills} 
                ></Abilities>
              );
            })}
          </GroupAbilities>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <GroupInventory>
            {characters.map((character, key) => {
              return character.data.inventory.map((item, key) => {
                return (
                  <>
                    <Item
                      avatar={character.data.avatarUrl}
                      characterName={character.data.name}
                      key={key}
                      name={item.definition.name}
                      weight={
                        item.definition.weight === 0
                          ? "--"
                          : item.definition.weight
                      }
                      cost={item.definition.cost ? item.definition.cost : "--"}
                      rarity={item.definition.rarity}
                      quantity={
                        item.definition.stackable === true
                          ? item.quantity
                          : "--"
                      }
                      armorClass={
                        item.definition.armorClass
                          ? item.definition.armorClass + " AC"
                          : null
                      }
                      type={item.definition.filterType}
                      damageDice={
                        item.definition.damage
                          ? item.definition.damage.diceString +
                            " " +
                            item.definition.damageType
                          : null
                      }
                      properties={
                        item.definition.properties
                          ? item.definition.properties
                          : null
                      }
                    ></Item>
                  </>
                );
              });
            })}
          </GroupInventory>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <GroupCurrencies characters={characters}>
            {characters.map((character, key) => {
              return (
                <Currencies
                  key={key}
                  avatar={character.data.avatarUrl}
                  name={character.data.name}
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
        <TabPanel value={value} index={3} dir={theme.direction}>
          {characters.map((character, key) => {
            return (
              <>
                {character.data.classes.map((characterClass, key) => {
                  return (
                    <SpellBook
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
                    </SpellBook>
                  );
                })}
              </>
            );
          })}
        </TabPanel>
      </SwipeableViews>
    </Paper>
  );
};

// const Characters = (props) => {
//   const classes = useStyles();
//   const [value, setValue] = useState(0);

//   const { characters } = props;

//   return (
//     <Paper elevation={3}>
//       <Tabs indicatorColor="primary" textColor="primary">
//         <Tab label="Stats" />
//         <TabPanel value={value} index={0}>
//           <GroupStats>
//             {characters.map((character, key) => {
//               return (
//                 <Abilities
//                   key={key}
//                   avatar={character.data.avatarUrl}
//                   name={character.data.name}
//                   strength={character.stats.strength}
//                   dexterity={character.stats.dexterity}
//                   constitution={character.stats.constitution}
//                   intelligence={character.stats.intelligence}
//                   wisdom={character.stats.wisdom}
//                   charisma={character.stats.charisma}
//                 ></Abilities>
//               );
//             })}
//           </GroupStats>
//         </TabPanel>
//       </Tabs>
//     </Paper>
//   );
// };

export default Characters;
