import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const ExperienceBar = (props) => {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);

  const { currentXp, nextLevelXp, percent, level } = props;


  function LinearProgressWithLabel(props) {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs>
              LVL {level}
            </Grid>
            <Grid item xs={8}>
              <LinearProgress variant="determinate" {...props} />
            </Grid>
            <Grid item xs>
              LVL {level + 1}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {`${currentXp}/${nextLevelXp}`}
        </Grid>
      </Grid>

    );
  }
  useEffect(() => {
    setProgress(progress);
  }, [progress]);
  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={percent} />
      <Typography variant="body2" gutterBottom></Typography>
    </div>
  );
};

export default ExperienceBar;
