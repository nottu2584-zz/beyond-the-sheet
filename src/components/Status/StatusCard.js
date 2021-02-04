import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Autorenew } from "@material-ui/icons";
import React from "react";
import { ExperienceBar } from "../ExperienceBar";
import { CONDITIONS } from "../Status";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: 450,
    height: 250,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  avatar: {
    height: 150,
    width: 150,
    maxHeight: "100%",
    maxWidth: "100%",
  },
  characterMisc: {
    span: {
      marginRight: 3,
    },
    race: {},
    gender: {},
  },
}));

const StatusCard = (props) => {
  const classes = useStyles();

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
        className={classes.avatar}
        image={avatar}
        title="Character Avatar"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h5" component="h2">
            {characterName}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.characterMisc}
          >
            <span className={classes.characterMisc.gender}>{gender}</span>
            <span className={classes.characterMisc.race}>{race}</span>
            <span className={classes.characterMisc.levels}>
              {levels.classes
                .map((charClass) => `${charClass.name} ${charClass.level}`)
                .join("/")}
            </span>
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
              currentXp={experience.currentXp}
              nextLevelXp={experience.nextLevelXp}
              level={levels.total}
              percent={experience.percent}
            ></ExperienceBar>
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default StatusCard;
