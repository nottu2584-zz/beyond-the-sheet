import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

const useSyles = makeStyles((theme) => ({
  root: {},
}));

const Item = (props) => {
  const classes = useSyles();

  const handleCharacter = () => {};

  const {
    avatar,
    characterName,
    name,
    weight,
    quantity,
    cost,
    rarity,
    armorClass,
    type,
    damageDice,
    description,
    properties,
  } = props;

  return (
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
          onClick={handleCharacter}
          variant="outlined"
        />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{weight}</TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>{cost}</TableCell>
      <TableCell>{rarity}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>
        {armorClass ? (
          <Chip label={armorClass} variant="outlined"></Chip>
        ) : null}
        {damageDice ? (
          <Chip label={damageDice} variant="outlined"></Chip>
        ) : null}
        {properties
          ? properties.map((property, key) => {
              return (
                <Chip
                  label={
                    property.name +
                    (property.notes ? " (" + property.notes + ")" : "")
                  }
                  variant="outlined"
                ></Chip>
              );
            })
          : null}
      </TableCell>
    </TableRow>
  );
};

export default Item;
