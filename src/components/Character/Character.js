import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Character = (props) => {
  const classes = useStyles();

  const { avatar, name, characterClass, characterRace, gender } = props;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="character"
            src={avatar}
            className={classes.avatar}
          />
        }
        action={null}
        title={name}
        subheader={gender + " " + characterRace}
      />
    </Card>
  );
};

export default Character;
