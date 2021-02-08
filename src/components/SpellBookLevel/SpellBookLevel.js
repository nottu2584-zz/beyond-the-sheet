import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Column, Item, Row } from "@mui-treasury/components/flex";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    "&:before": {
      transition: "0.2s",
      position: "absolute",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      borderRadius: "1rem",
      zIndex: 0,
      bottom: 0,
    },
  },
  card: {
    zIndex: 1,
    position: "relative",
    borderRadius: "1.5rem ",
    boxShadow: "0 0px 100px 0 #060606",
    background: "#2C3E50",
    transition: "0.4s",
    height: "100%",
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
  logo: {
    width: 48,
    height: 48,
    borderRadius: "0.75rem",
  },
  characterMisc: {
    span: {
      marginRight: 3,
    },
    race: {},
    gender: {},
  },
}));

const SpellBookLevel = (props) => {
  const classes = useStyles();

  const {
    avatar,
    spellName,
    characterName,
    school,
    level,
    time,
    hit,
    DC,
    range,
    components,
    duration,
    link,
  } = props;

  //url idea for a card https://mui-treasury.com/components/card/
  return (
    <Card className={classes.root}>
      <div position="middle-left">
        <Avatar alt={characterName} src={avatar} className={classes.avatar} />
      </div>
      <ul>{props.children.map((child) => child)}</ul>
    </Card>
  );
};

export default SpellBookLevel;
