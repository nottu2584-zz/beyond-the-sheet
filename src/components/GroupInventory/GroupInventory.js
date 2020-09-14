import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect } from "react";
import { Item } from "../Item";

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

const GroupInventory = (props) => {
  const classes = useStyles();
  const { characters } = props;

  const inventory = []
    .concat(
      ...characters.map((character, key) => {
        return character.data.inventory.map((item, key) => {
          return {
            id: item.definition.id,
            armorClass: item.definition.armorClass
              ? item.definition.armorClass + " AC"
              : null,
            avatarUrl: item.definition.avatarUrl || null,
            cost: item.definition.cost || "--",
            damageDice: item.definition.damage
              ? item.definition.damage.diceString +
                " " +
                item.definition.damageType
              : null,
            name: item.definition.name,
            owners: [
              {
                id: character.data.id,
                avatarUrl: character.data.avatarUrl,
                name: character.data.name,
              },
            ],
            properties: item.definition.properties
              ? item.definition.properties
              : null,
            quantity: item.definition.stackable === true ? item.quantity : "--",
            rarity: item.definition.rarity,
            type: item.definition.filterType,
            weight: item.definition.weight || "--",
          };
        });
      })
    )
    .reduce((obj, item) => {
      obj[item.id]
        ? obj[item.id].owners.push(...item.owners)
        : (obj[item.id] = { ...item });
      return obj;
    }, []);

  useEffect(() => {});

  console.log("inventory", inventory);

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>NAME</TableCell>
          <TableCell>WEIGHT</TableCell>
          <TableCell>QUANTITY</TableCell>
          <TableCell>COST</TableCell>
          <TableCell>RARITY</TableCell>
          <TableCell>TYPE</TableCell>
          <TableCell>PROPERTIES</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {inventory.map((item, key) => {
          return (
            <Item
              key={key}
              armorClass={item.armorClass ? item.armorClass + " AC" : null}
              damageDice={
                item.damage
                  ? item.damage.diceString + " " + item.damageType
                  : null
              }
              cost={item.cost ? item.cost : "--"}
              name={item.name}
              owners={item.owners}
              properties={item.properties}
              quantity={item.stackable === true ? item.quantity : "--"}
              rarity={item.rarity}
              type={item.filterType}
              weight={item.weight === 0 ? "--" : item.weight}
            ></Item>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default GroupInventory;
