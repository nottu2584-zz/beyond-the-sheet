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

  const pp = () => {
    return (
      props.children.reduce((acc, child) => {
        return acc + child.props.pp
      },0)
    )
  }
  const gp = () => {
    return (
      props.children.reduce((acc, child) => {
        return acc + child.props.gp
      },0)
    )
  }
  const ep = () => {
    return (
      props.children.reduce((acc, child) => {
        return acc + child.props.ep
      },0)
    )
  }
  const sp = () => {
    return (
      props.children.reduce((acc, child) => {
        return acc + child.props.sp
      },0)
    )
  }
  const cp = () => {
    return (
      props.children.reduce((acc, child) => {
        return acc + child.props.sp
      },0)
    )
  }



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
      <TableBody>
        {props.children}
        <TableRow>
          <TableCell></TableCell>
          {/* <TableCell>{accPP}</TableCell>
          <TableCell>{pp()}</TableCell>
          <TableCell>{accEP}</TableCell>
          <TableCell>{accSP}</TableCell>
          <TableCell>{accCP}</TableCell>
          <TableCell>{acc}</TableCell> */}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default GroupCurrencies;
