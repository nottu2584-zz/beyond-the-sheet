import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";
import { CharacterCard } from "../CharacterCard";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const CharacterTooltip = (props) => {
  const classes = useStyles();

  const {
    avatar,
    characterName,
    ac,
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
    <Tooltip
      title={
        <CharacterCard
          avatar={avatar}
          name={name}
          race={race}
          ac={ac}
          charClass={charClass}
          levels={levels}
          experience={experience}
          gender={gender}
        ></CharacterCard>
      }
    >
      <Chip
        avatar={
          <Avatar alt={characterName} src={avatar} className={classes.avatar} />
        }
        label={characterName}
        variant="outlined"
      />
    </Tooltip>
  );
};

export default CharacterTooltip;
