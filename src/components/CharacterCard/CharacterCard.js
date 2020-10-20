import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { ExperienceBar } from "../ExperienceBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const CharacterCard = (props) => {
  const classes = useStyles();

  const handleCharacter = () => {};

  const theme = useTheme();

  const {
    ac,
    avatar,
    charClass,
    conditions,
    currentHp,
    experience,
    gender,
    hpMax,
    levels,
    name,
    race,
  } = props;

    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={avatar}
          title="Character Avatar"
        />
        <div className={classes.details}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {gender} {race} {charClass} {levels}
            </Typography>
            <Typography variant="body1" component="p">
              HP: {currentHp}/{hpMax} AC: {ac}
            </Typography>
            <Typography variant="body2" component="p">
              <ExperienceBar
                percent={experience}
                level={levels}
              ></ExperienceBar>
            </Typography>
          </CardContent>
        </div>
      </Card>
    );
};

export default CharacterCard;
