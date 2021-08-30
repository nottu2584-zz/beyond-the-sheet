import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Spells from "./Spells";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const SpellCard = (props) => {
  const classes = useStyles();

  const theme = useTheme();

  const {
    avatar,
    characterName,
    slots,
    slotsSpended,
    pactMagicSlots,
    pactMagicSlotsSpended,
  } = props;

  const checkBox = (slots, slotsSpended) => {
    let spellSlots = new Array(slots);
    for (let key = 0; key < slots; key++) {
      spellSlots[key] =
        slotsSpended !== key && key < slotsSpended ? (
          <Checkbox checked indeterminate />
        ) : (
          <Checkbox checked indeterminate color="default" />
        );
    }
    return spellSlots;
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.root}
        avatar={
          <Avatar alt={characterName} src={avatar} className={classes.avatar} />
        }
        title={characterName}
        subheader={
          slots ? checkBox(slots, slotsSpended).map((slot) => slot) : null
        }
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
