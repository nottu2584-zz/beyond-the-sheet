import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  uncommon: {
    color: "#1fc219",
  },
  rare: {
    color: "#4990e2",
  },
  veryRare: {
    color: "#9810e0",
  },
  legendary: {
    color: "#fea227",
  },
  artifact: {
    color: "#be8972",
  },
}));

const Item = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleCharacter = () => {};

  const {
    name,
    weight,
    quantity,
    cost,
    rarity,
    armorClass,
    owners,
    type,
    damageDice,
    description,
    properties,
  } = props;

  return (
    <>
      <TableRow>
        <TableCell>
          {owners.length > 1 ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : null}
        </TableCell>
        <TableCell className={classes[rarity.toLowerCase()]}>{name}</TableCell>
        <TableCell>{weight || "--"}</TableCell>
        <TableCell>{quantity || "--"}</TableCell>
        <TableCell>{cost || "--"}</TableCell>
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
                    size="small"
                    variant="outlined"
                  ></Chip>
                );
              })
            : null}
        </TableCell>
      </TableRow>
      {owners.length > 1 ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small" aria-label="purchases">
                {owners.map((owner) => (
                  <TableRow key={owner.id}>
                    <TableCell>
                      <Chip
                        color="primary"
                        avatar={
                          <Avatar
                            alt={owner.name}
                            src={owner.avatarUrl}
                            className={classes.avatar}
                          />
                        }
                        label={owner.name}
                      />
                    </TableCell>
                    <TableCell>{owner.weight || "--"}</TableCell>
                    <TableCell>{owner.quantity || "--"}</TableCell>
                  </TableRow>
                ))}
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
};

export default Item;
