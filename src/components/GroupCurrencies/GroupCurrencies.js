import { Paper, TableContainer, TableFooter } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { toGold } from "../Currencies";

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

const GroupCurrencies = (props) => {
  const classes = useStyles();

  const pp = props.children.reduce((acc, child) => {
    return acc + child.props.pp;
  }, 0);

  const gp = props.children.reduce((acc, child) => {
    return acc + child.props.gp;
  }, 0);

  const ep = props.children.reduce((acc, child) => {
    return acc + child.props.ep;
  }, 0);

  const sp = props.children.reduce((acc, child) => {
    return acc + child.props.sp;
  }, 0);

  const cp = props.children.reduce((acc, child) => {
    return acc + child.props.sp;
  }, 0);

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>PP</TableCell>
            <TableCell>GP</TableCell>
            <TableCell>EP</TableCell>
            <TableCell>SP</TableCell>
            <TableCell>CP</TableCell>
            <TableCell>total(GP)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.children.map((child, key) => {
            return (
              <StyledTableRow key={key}>{child}</StyledTableRow>
            );
          })}
          <TableRow>
            <TableCell></TableCell>
            <TableCell>{pp}</TableCell>
            <TableCell>{gp}</TableCell>
            <TableCell>{ep}</TableCell>
            <TableCell>{sp}</TableCell>
            <TableCell>{cp}</TableCell>
            <TableCell>
              {toGold({ pp: pp, gp: gp, ep: ep, sp: sp, cp: cp })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GroupCurrencies;
