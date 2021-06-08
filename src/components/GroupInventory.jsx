import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect, useState } from "react";
import { Item } from ".";

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
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    setInventory(
      Object.values({
        ...[]
          .concat(
            ...characters.map((character, key) => {
              return character.data.inventory.map((item, key) => {
                return {
                  id: item.definition.id,
                  armorClass: item.definition.armorClass
                    ? item.definition.armorClass
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
                      quantity:
                        item.definition.stackable === true
                          ? item.quantity
                          : "--",
                      weight: item.definition.weight || "--",
                    },
                  ],
                  properties: item.definition.properties
                    ? item.definition.properties
                    : null,
                  quantity:
                    item.definition.stackable === true ? item.quantity : "--",
                  rarity: item.definition.rarity,
                  stackable: item.definition.stackable,
                  type: item.definition.filterType,
                  weight: item.definition.weight || "--",
                };
              });
            })
          )
          .reduce((acc, item) => {
            if (acc[item.id]) {
              acc[item.id].owners.push(...item.owners);
              acc[item.id].quantity += item.owners.reduce(
                (a, b) => a + b.quantity,
                0
              );
              acc[item.id].weight +=
                item.owners.reduce((a, b) => a + b.quantity, 0) *
                acc[item.id].weight;
            } else acc[item.id] = { ...item };
            return acc;
          }, []),
      }).sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      )
    );
  }, [characters]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Notes</TableCell>
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
                cost={item.cost}
                name={item.name}
                owners={item.owners}
                properties={item.properties}
                quantity={item.stackable}
                rarity={item.rarity}
                type={item.filterType}
                weight={item.weight}
              ></Item>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GroupInventory;
