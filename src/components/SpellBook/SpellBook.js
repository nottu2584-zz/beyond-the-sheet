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
import { SpellCard } from "../SpellCard";

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
  const { characters } = props;

  const SpellKeeper = (characters) => {}

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableRow>
          <TableCell>CANTRIPS</TableCell>
          <TableCell>1ST</TableCell>
          <TableCell>2ND</TableCell>
          <TableCell>3RD</TableCell>
          <TableCell>4TH</TableCell>
          <TableCell>5TH</TableCell>
          <TableCell>6TH</TableCell>
          <TableCell>7TH</TableCell>
          <TableCell>8TH</TableCell>
          <TableCell>9TH</TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
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
