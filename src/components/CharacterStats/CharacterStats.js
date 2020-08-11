import Grid from "@material-ui/core/Grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
});

const CharacterStats = (props) => {
  
  let {
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
  } = props;

  if (props.stats)
    [
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
    ] = props.stats;

  return (
    <ThemeProvider theme={lightTheme}>
      <Grid container spacing={3}>
        <Grid item xs={2}>{strength}</Grid>
        <Grid item xs={2}>{dexterity}</Grid>
        <Grid item xs={2}>{constitution}</Grid>
        <Grid item xs={2}>{intelligence}</Grid>
        <Grid item xs={2}>{wisdom}</Grid>
        <Grid item xs={2}>{charisma}</Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default CharacterStats;
