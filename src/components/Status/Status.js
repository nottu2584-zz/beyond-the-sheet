import { AccordionActions } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Status = (props) => {
  const classes = useStyles();

  let {
    avatar,
    characterName,
    hitPoints,
    armorClass,
    experience,
    conditions,
  } = props;

  const xpTable = [
    0,
    300,
    900,
    2700,
    6500,
    14000,
    23000,
    34000,
    48000,
    64000,
    85000,
    100000,
    120000,
    140000,
    165000,
    195000,
    225000,
    265000,
    305000,
    355000,
  ];

  experience = xpTable.map((xp) => {
    if (experience >= xpTable[xp] && experience < xpTable[xp + 1]) {
      return {
        level: xp + 1,
        nextLevel: xp + 2,
        percent: (experience / xpTable[xp + 1]) * 100,
      };
    } else return "";
  });

  return (
    <TableRow>
      <TableCell>
        <Chip
          avatar={
            <Avatar
              alt={characterName}
              src={avatar}
              className={classes.avatar}
            />
          }
          label={characterName}
          variant="outlined"
        />
      </TableCell>
      <TableCell>{hitPoints}</TableCell>
      <TableCell>{armorClass}</TableCell>
      <TableCell>{experience}</TableCell>
      <TableCell>{conditions}</TableCell>
    </TableRow>
  );
};

export default Status;
