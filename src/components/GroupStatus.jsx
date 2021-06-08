import { Paper, TableContainer, TableFooter } from "@material-ui/core";
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

const GroupStatus = (props) => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>HP</TableCell>
            <TableCell>AC</TableCell>
            <TableCell>Xp</TableCell>
            <TableCell>Conditions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.children.map((child, key) => {
            return <StyledTableRow key={key}>{child}</StyledTableRow>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GroupStatus;
