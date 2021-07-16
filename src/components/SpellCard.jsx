import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    height: 200,
  },
}));

const SpellCard = (props) => {
  const classes = useStyles();

  const theme = useTheme();

  const { avatar, characterName } = props;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar alt={characterName} src={avatar} className={classes.avatar} />
        }
        title={characterName}
      ></CardHeader>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.children}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SpellCard;
