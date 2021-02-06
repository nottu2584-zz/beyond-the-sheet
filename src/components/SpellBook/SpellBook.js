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
  const {
    cantripsKnown,
    characterName,
    spellsKnown,
    spellSlots,
    avatar,
    spellName,
    school,
    level,
    time,
    range,
    hitDC,
    duration,
    components,
    link,
  } = props;

  console.log("Spells Slot", spellSlots);

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableRow>
        
        </TableRow>
       {props.children.map((child) => child)}
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
