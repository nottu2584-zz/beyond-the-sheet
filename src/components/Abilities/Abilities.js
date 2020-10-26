import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { CharacterTooltip } from "../CharacterTooltip";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Abilities = (props) => {
  const classes = useStyles();

  const handleCharacter = () => {};

  const {
    avatar,
    name,
    race,
    hitPoints,
    armorClass,
    conditions,
    levels,
    gender,
    abilities,
    initiative,
    savingThrows,
    skills,
  } = props;

  return (
    <TableRow>
      <TableCell>
        <CharacterTooltip
          avatar={avatar}
          characterName={name}
          name={name}
          race={race}
          currentHp={hitPoints.current}
          hpMax={hitPoints.max}
          ac={armorClass}
          conditions={conditions}
          charClass={levels.classes.level}
          levels={levels.classes.name}
          experience={50}
          gender={gender}
        ></CharacterTooltip>
      </TableCell>
      <TableCell>{initiative.value}</TableCell>
      <TableCell>{abilities.strength.value}</TableCell>
      <TableCell>{savingThrows.strength.value}</TableCell>
      <TableCell>{skills.athletics.value}</TableCell>
      <TableCell>{abilities.dexterity.value}</TableCell>
      <TableCell>{savingThrows.dexterity.value}</TableCell>
      <TableCell>{skills.acrobatics.value}</TableCell>
      <TableCell>{skills.sleightOfHand.value}</TableCell>
      <TableCell>{skills.stealth.value}</TableCell>
      <TableCell>{abilities.constitution.value}</TableCell>
      <TableCell>{savingThrows.constitution.value}</TableCell>
      <TableCell>{abilities.intelligence.value}</TableCell>
      <TableCell>{savingThrows.intelligence.value}</TableCell>
      <TableCell>{skills.arcana.value}</TableCell>
      <TableCell>{skills.history.value}</TableCell>
      <TableCell>{skills.investigation.value}</TableCell>
      <TableCell>{skills.nature.value}</TableCell>
      <TableCell>{skills.religion.value}</TableCell>
      <TableCell>{abilities.wisdom.value}</TableCell>
      <TableCell>{savingThrows.wisdom.value}</TableCell>
      <TableCell>{skills.animalHandling.value}</TableCell>
      <TableCell>{skills.insight.value}</TableCell>
      <TableCell>{skills.perception.value}</TableCell>
      <TableCell>{skills.survival.value}</TableCell>
      <TableCell>{abilities.charisma.value}</TableCell>
      <TableCell>{savingThrows.charisma.value}</TableCell>
      <TableCell>{skills.deception.value}</TableCell>
      <TableCell>{skills.intimidation.value}</TableCell>
      <TableCell>{skills.performance.value}</TableCell>
      <TableCell>{skills.persuasion.value}</TableCell>
    </TableRow>
  );
};

export default Abilities;
