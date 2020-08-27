import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Abilities = (props) => {
  const classes = useStyles();

  const handleCharacter = () => {};

  const {
    avatar,
    name,
    stats,
    skills
  } = props;

  console.log("skills", skills)
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
      <TableCell>{stats.strength.value}</TableCell>
      <TableCell>{skills.athletics.value}</TableCell>
      <TableCell>{stats.dexterity.value}</TableCell>
      <TableCell>{skills.acrobatics.value}</TableCell>
      <TableCell>{skills.sleightOfHand.value}</TableCell>
      <TableCell>{skills.stealth.value}</TableCell>
      <TableCell>{stats.constitution.value}</TableCell>
      <TableCell>{stats.intelligence.value}</TableCell>
      <TableCell>{skills.arcana.value}</TableCell>
      <TableCell>{skills.history.value}</TableCell>
      <TableCell>{skills.investigation.value}</TableCell>
      <TableCell>{skills.nature.value}</TableCell>
      <TableCell>{skills.religion.value}</TableCell>
      <TableCell>{stats.wisdom.value}</TableCell>
      <TableCell>{skills.animalHandling.value}</TableCell>
      <TableCell>{skills.insight.value}</TableCell>
      <TableCell>{skills.perception.value}</TableCell>
      <TableCell>{skills.survival.value}</TableCell>
      <TableCell>{stats.charisma.value}</TableCell>
      <TableCell>{skills.deception.value}</TableCell>
      <TableCell>{skills.intimidation.value}</TableCell>
      <TableCell>{skills.performance.value}</TableCell>
      <TableCell>{skills.persuasion.value}</TableCell>
    </TableRow>
  );
};

export default Abilities;
