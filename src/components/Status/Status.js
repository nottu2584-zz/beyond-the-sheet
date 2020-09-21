import LinearProgress from "@material-ui/core/LinearProgress";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import React from "react";
import { ExperienceBar } from "../ExperienceBar";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Status = (props) => {
  const classes = useStyles();

  const { avatar, characterName, hitPoints, armorClass, experience } = props;

  let { conditions } = props;

  const xpTable = [
    0,
    300,
    900,
    2700,
    6500,
    14000,
    23000,
    34000,
    48000,
    64000,
    85000,
    100000,
    120000,
    140000,
    165000,
    195000,
    225000,
    265000,
    305000,
    355000,
  ];

  const xp = xpTable
    .filter(
      (cap, key, table) =>
        experience.value >= cap && experience.value < table[key + 1]
    )
    .reduce((acc, value) => {
      return {
        currentXp: value,
        nextLevelXp: xpTable[xpTable.indexOf(value) + 1],
        percent:
          ((experience.value - value) /
            (xpTable[xpTable.indexOf(value) + 1] - value)) *
          100,
      };
    }, null);

  const conditionsArray = [
    "Blinded",
    "Charmed",
    "Deafened",
    "Exhaustion",
    "Frightened",
    "Grappled",
    "Incapacitated",
    "Invisible",
    "Paralyzed",
    "Petrified",
    "Posioned",
    "Prone",
    "Restrained",
    "Stunned",
    "Unconscious",
  ];

  return (
    <>
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
          variant="outlined"
        />
      </TableCell>
      <TableCell>
        <TableHead>
          <TableRow>
            <TableCell>CURRENT</TableCell>
            <TableCell>MAX</TableCell>
            <TableCell>TEMP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell>{hitPoints.current}</TableCell>
          <TableCell>{hitPoints.max}</TableCell>
          <TableCell>{hitPoints.temp}</TableCell>
        </TableBody>
      </TableCell>
      <TableCell>{armorClass}</TableCell>
      <TableCell>
        <ExperienceBar
          currentXp={xp.level}
          nextLevelXp={xp.nextLevel}
          percent={xp.percent}
        ></ExperienceBar>
      </TableCell>
      <TableCell>
        {conditions
          .map((condition) => {
            return condition.id === 4
              ? `${conditionsArray[condition.id - 1]} (Level ${
                  condition.level
                })`
              : conditionsArray[condition.id - 1];
          })
          .join(", ")}
      </TableCell>
    </>
  );
};

export default Status;
