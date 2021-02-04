import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { ExperienceBar } from "../ExperienceBar";
import { CONDITIONS, Status } from "../Status";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: "300px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    height: 150,
    width: 300,
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
    avatar,
    characterName,
    hitPoints,
    armorClass,
    experience,
    levels,
    gender,
    race,
  } = props;

  let { conditions } = props;

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
            {characterName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
          </Typography>
          <Typography variant="body1" component="p">
            HP:{hitPoints.current} / {hitPoints.max} AC:{armorClass}
          </Typography>
          <Typography>
            {conditions
              .map((condition) => {
                return condition.id === 4
                  ? `${CONDITIONS[condition.id - 1]} (Level ${condition.level})`
                  : CONDITIONS[condition.id - 1];
              })
              .join(", ")}
          </Typography>
          <Typography variant="body2" component="p">
            <ExperienceBar
              currentXp={experience.level}
              nextLevelXp={experience.nextLevel}
              percent={experience.percent}
            ></ExperienceBar>
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default CharacterCard;
