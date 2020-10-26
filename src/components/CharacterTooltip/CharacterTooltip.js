import { ClickAwayListener } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import React, { useState } from "react";
import { CharacterCard } from "../CharacterCard";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const CharacterTooltip = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [disableHover, setHover] = useState(false);
  
  const {
    avatar,
    characterName,
    ac,
    conditions,
    experience,
    gender,
    currentHp,
    hpMax,
    levels,
    name,
    race,
  } = props;

  const handleClick = () => {
    setOpen(true);
    setHover(true);
  };

  const handleClose = () => {
    setOpen(false);
    setHover(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Tooltip
      open={open}
      disableHoverListener={disableHover}
      onClose={handleClose}
      onOpen={handleOpen}
      onClick={handleClick}
      title={
        <CharacterCard
          avatar={avatar}
          name={name}
          race={race}
          ac={ac}
          currentHp={currentHp}
          hpMax={hpMax}
          conditions={conditions}
          charClass={levels}
          levels={levels}
          experience={experience}
          gender={gender}
        ></CharacterCard>
      }
    >
      <Chip
        avatar={
          <Avatar alt={characterName} src={avatar} className={classes.avatar} />
        }
        label={characterName}
        variant="outlined"
      />
    </Tooltip>
  );
};

export default CharacterTooltip;
