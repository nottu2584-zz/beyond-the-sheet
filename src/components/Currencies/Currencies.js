import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

const useSyles = makeStyles((theme) => ({
  root: {},
}));

const Currencies = (props) => {
  const classes = useSyles();

  const handleCharacter = () => {};

  const { avatar, name, cp, ep, gp, pp, sp } = props;

  const currencyConversion = (currencies) => {
    currencies.map((currency) => {
      switch (currency) {
        case "pp": 
          return currency * 10;
        case "ep":
          return currency * 0.5;
        case "sp":
          return currency / 10;
        case "cp":
          return currency /100;
        default:
          return null;
        };
    });
  };

  return (
    <TableRow>
      <TableCell>
        <Chip
          avatar={<Avatar alt={name} src={avatar} className={classes.avatar} />}
          label={name}
          onClick={handleCharacter}
          variant="outlined"
        />
      </TableCell>
      <TableCell>{pp}</TableCell>
      <TableCell>{gp}</TableCell>
      <TableCell>{ep}</TableCell>
      <TableCell>{sp}</TableCell>
      <TableCell>{cp}</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default Currencies;
