import LinearProgress from '@material-ui/core/LinearProgress';
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


  const xp = xpTable.filter(
      (cap, key, table) =>
        experience.value >= cap && experience.value < table[key + 1]
    )
    .reduce((acc, value) => {
      return {
        level: value,
        nextLevel: xpTable[xpTable.indexOf(value)+1],
        percent: ((experience.value - value) / (xpTable[xpTable.indexOf(value)+1] - value)) * 100,
      };
    },null);

  console.log(xp);

  return (
    <>
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
      <TableCell>
        {hitPoints.current}
        {hitPoints.max}
        {hitPoints.temp}
      </TableCell>
      <TableCell>{armorClass}</TableCell>
      <TableCell>
        <LinearProgress value={Math.round(xp.percent)}  />
      </TableCell>
      <TableCell>
        {conditions.length
          ? conditions.map((condition) => <>{condition}</>)
          : null}
      </TableCell>
    </>
  );
};

export default Status;
