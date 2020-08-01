import React from "react";
import "./CharacterStats.css";

const CharacterStats = (props) => {
  return (
    <div className="flex-container">
      <div>{props.strenght}</div>
      <div>{props.dexterity}</div>
      <div>{props.constitution}</div>
      <div>{props.intelligence}</div>
      <div>{props.wisdom}</div>
      <div>{props.charisma}</div>
    </div>
  );
};

export default CharacterStats;
