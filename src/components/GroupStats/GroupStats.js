import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

const useStyles = makeStyles({
  table: {
  },
});

const GroupStats = (props) => {
  const classes = useStyles();

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>STR</TableCell>
          <TableCell>DEX</TableCell>
          <TableCell>CON</TableCell>
          <TableCell>INT</TableCell>
          <TableCell>WIS</TableCell>
          <TableCell>CHA</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{props.children}</TableBody>
    </Table>
  );
};

export default GroupStats;
