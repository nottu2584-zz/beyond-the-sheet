import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { useState } from "react";
import { CharacterStats } from "../CharacterStats";
import { GroupStats } from "../GroupStats";
import Box from "@material-ui/core/Box";

import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";

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
        <Tab label="Stats" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <GroupStats>
            {characters.map((character, key) => {
              return (
                <CharacterStats
                  key={key}
                  avatar={character.data.avatarUrl}
                  name={character.data.name}
                  strength={character.stats.strength}
                  dexterity={character.stats.dexterity}
                  constitution={character.stats.constitution}
                  intelligence={character.stats.intelligence}
                  wisdom={character.stats.wisdom}
                  charisma={character.stats.charisma}
                ></CharacterStats>
              );
            })}
          </GroupStats>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
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
//                 <CharacterStats
//                   key={key}
//                   avatar={character.data.avatarUrl}
//                   name={character.data.name}
//                   strength={character.stats.strength}
//                   dexterity={character.stats.dexterity}
//                   constitution={character.stats.constitution}
//                   intelligence={character.stats.intelligence}
//                   wisdom={character.stats.wisdom}
//                   charisma={character.stats.charisma}
//                 ></CharacterStats>
//               );
//             })}
//           </GroupStats>
//         </TabPanel>
//       </Tabs>
//     </Paper>
//   );
// };

export default Characters;
