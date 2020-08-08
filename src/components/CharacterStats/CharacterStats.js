import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
  stat: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const CharacterStats = (props) => {
  const classes = useStyles();
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
    <Grid container spacing={3}>
      <Grid item xs={2}>
        <Paper className={classes.stat}>{strength}</Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper className={classes.stat}>{dexterity}</Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper className={classes.stat}>{constitution}</Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper className={classes.stat}>{intelligence}</Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper className={classes.stat}>{wisdom}</Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper className={classes.stat}>{charisma}</Paper>
      </Grid>
    </Grid>
  );
};

export default CharacterStats;
