import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const ExperienceBar = (props) => {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);

  const { currentXp, nextLevelXp, percent, level } = props;

  function LinearProgressWithLabel(propsProgress) {
    return (
      <Box display="flex" alignItems="center">
        <Box minWidth={35}>
          <Typography variant="caption" color="textSecondary">
            Lvl {level}
          </Typography>
        </Box>
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...propsProgress} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="caption" color="textSecondary">
            Lvl {level + 1}
          </Typography>
        </Box>
      </Box>
    );
  }
  useEffect(() => {
    setProgress(progress);
  }, []);

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={percent} />
      <Typography variant="body2" gutterBottom>
      </Typography>
    </div>
  );
};

export default ExperienceBar;
