import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { ExperienceBar } from "../ExperienceBar";
import { CONDITIONS } from "../Status";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const StatusTable = (props) => {
  const classes = useStyles();

  const { avatar, characterName, hitPoints, armorClass, experience } = props;

  let { conditions } = props;

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
          currentXp={experience.level}
          nextLevelXp={experience.nextLevel}
          percent={experience.percent}
        ></ExperienceBar>
      </TableCell>
      <TableCell>
        {conditions
          .map((condition) => {
            return condition.id === 4
              ? `${CONDITIONS[condition.id - 1]} (Level ${condition.level})`
              : CONDITIONS[condition.id - 1];
          })
          .join(", ")}
      </TableCell>
    </>
  );
};

export default StatusTable;