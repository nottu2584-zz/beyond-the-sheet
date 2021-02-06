import {
  Avatar,
  Chip,
  Paper,
  TableContainer,
  TableFooter,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

const useStyles = makeStyles({
  table: {},
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const SpellBook = (props) => {
  const classes = useStyles();
  const {
    cantripsKnown,
    characterName,
    spellsKnown,
    spellSlots,
    avatar,
  } = props;

  console.log("Spells Slot", spellSlots);

  return (
    <TableContainer>
      <Table className={classes.table}>
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
          <TableCell>Cantrips Known: {cantripsKnown}</TableCell>
          <TableCell>Spells Known: {spellsKnown}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          {spellSlots.map((index, acc) =>
            index !== 0 ? (
              <TableCell>
                {slots(acc + 1)}
                {index}
              </TableCell>
            ) : null
          )}
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Level</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Range</TableCell>
          <TableCell>hitDC</TableCell>
          <TableCell>Duration</TableCell>
          <TableCell>Components</TableCell>
        </TableRow>
        {props.children.map((child) => child)}
      </Table>
    </TableContainer>
  );
};

const slots = (level) => {
  return level === 1
    ? `${level}ST LEVEL: `
    : level === 2
    ? `${level}ND LEVEL: `
    : level === 3
    ? `${level}RD LEVEL: `
    : `${level}TH LEVEL: `;
};

export default SpellBook;

// <div className="container">
//   <div>{characterName}</div>
//   <div>Cantrips Known: {cantripsKnown}</div>
//   <div>Spells Known: {spellsKnown}</div>
//   <div>
//     {spellSlots.map((index, acc) =>
//       index !== 0 ? `Level ${acc + 1}: ${index}` : null
//     )}
//   </div>
//   <div>{props.children}</div>
// </div>
