import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { CharacterTooltip } from "../CharacterTooltip";

const useSyles = makeStyles((theme) => ({
  root: {},
}));

export const toGold = (currencies) => {
  return Object.keys(currencies).reduce((acc, currency) => {
    switch (currency) {
      case "pp":
        return acc + currencies[currency] * 10;
      case "gp":
        return acc + currencies[currency];
      case "ep":
        return acc + currencies[currency] * 0.5;
      case "sp":
        return acc + currencies[currency] / 10;
      case "cp":
        return acc + currencies[currency] / 100;
      default:
        return acc;
    }
  }, 0);
};

const Currencies = (props) => {
  const classes = useSyles();

  const handleCharacter = () => {};

  const {
    avatar,
    characterName,
    hitPoints,
    armorClass,
    experience,
    levels,
    gender,
    race,
    conditions,
    cp,
    ep,
    gp,
    pp,
    sp,
  } = props;

  return (
    <>
      <TableCell>
        <CharacterTooltip
          avatar={avatar}
          characterName={characterName}
          hitPoints={hitPoints}
          armorClass={armorClass}
          experience={experience}
          levels={levels}
          gender={gender}
          race={race}
          conditions={conditions}
        ></CharacterTooltip>
      </TableCell>
      <TableCell>{pp}</TableCell>
      <TableCell>{gp}</TableCell>
      <TableCell>{ep}</TableCell>
      <TableCell>{sp}</TableCell>
      <TableCell>{cp}</TableCell>
      <TableCell>
        {Math.round(toGold({ pp: pp, gp: gp, ep: ep, sp: sp, cp: cp }))}
      </TableCell>
    </>
  );
};

export default Currencies;
