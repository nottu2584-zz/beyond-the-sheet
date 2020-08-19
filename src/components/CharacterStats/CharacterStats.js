import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const CharacterStats = (props) => {
  const classes = useStyles();

  const handleCharacter = () => {};

  let {
    avatar,
    name,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
  } = props;

  if (props.stats)
    [
      avatar,
      name,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
    ] = props.stats;

  return (
    <TableRow>
      <TableCell>
        <Chip
          avatar={<Avatar alt={name} src={avatar} className={classes.avatar} />}
          label={name}
          onClick={handleCharacter}
          variant="outlined"
        />
      </TableCell>
      <TableCell>{strength}</TableCell>
      <TableCell>{dexterity}</TableCell>
      <TableCell>{constitution}</TableCell>
      <TableCell>{intelligence}</TableCell>
      <TableCell>{wisdom}</TableCell>
      <TableCell>{charisma}</TableCell>
    </TableRow>
  );
};

export default CharacterStats;
