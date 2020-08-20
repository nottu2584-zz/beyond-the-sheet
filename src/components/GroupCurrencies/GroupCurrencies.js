import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

const useStyles = makeStyles({
  table: {},
});

const GroupCurrencies = (props) => {
  const classes = useStyles();

  return (
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
      <TableBody>{props.children}</TableBody>
    </Table>
  );
};

export default GroupCurrencies;
