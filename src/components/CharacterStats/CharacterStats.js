import React from "react";
import "./CharacterStats.css";

const CharacterStats = (props) => {
  let {
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
  } = props;

  if (props.stats)
    [
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
    ] = props.stats;

  return (
    <div className="container">
      <div>{strength}</div>
      <div>{dexterity}</div>
      <div>{constitution}</div>
      <div>{intelligence}</div>
      <div>{wisdom}</div>
      <div>{charisma}</div>
    </div>
  );
};

export default CharacterStats;
