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

const GroupAbilities = (props) => {
  const classes = useStyles();

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>Initative</TableCell>
          <TableCell>STR</TableCell>
          <TableCell>Saving Trhow</TableCell>
          <TableCell>Athletics</TableCell>
          <TableCell>DEX</TableCell>
          <TableCell>Saving Trhow</TableCell>
          <TableCell>Acrobatics</TableCell>
          <TableCell>Sleight of hand</TableCell>
          <TableCell>Stealth</TableCell>
          <TableCell>CON</TableCell>
          <TableCell>Saving Trhow</TableCell>
          <TableCell>INT</TableCell>
          <TableCell>Saving Trhow</TableCell>
          <TableCell>Arcana</TableCell>
          <TableCell>History</TableCell>
          <TableCell>Investigation</TableCell>
          <TableCell>Nature</TableCell>
          <TableCell>Religion</TableCell>
          <TableCell>WIS</TableCell>
          <TableCell>Saving Trhow</TableCell>
          <TableCell>Animal Handling</TableCell>
          <TableCell>Insight</TableCell>
          <TableCell>Perception</TableCell>
          <TableCell>Survival</TableCell>
          <TableCell>CHA</TableCell>
          <TableCell>Saving Trhow</TableCell>
          <TableCell>Deception</TableCell>
          <TableCell>Intimidation</TableCell>
          <TableCell>Performance</TableCell>
          <TableCell>Persuasion</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{props.children}</TableBody>
    </Table>
  );
};

export default GroupAbilities;
