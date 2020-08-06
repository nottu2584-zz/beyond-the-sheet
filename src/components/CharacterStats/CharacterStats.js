import React from "react";
import "./CharacterStats.css";

const CharacterStats = (props) => {
  let {
    strenght,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
  } = props;

  if (props.stats)
    [
      strenght,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
    ] = props.stats;

  return (
    <div className="flex-container">
      <div>{strenght}</div>
      <div>{dexterity}</div>
      <div>{constitution}</div>
      <div>{intelligence}</div>
      <div>{wisdom}</div>
      <div>{charisma}</div>
    </div>
  );
};

export default CharacterStats;
