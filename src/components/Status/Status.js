import React from "react";
import { StatusCard, StatusTable } from ".";

export const CONDITIONS = [
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

const Status = (props) => {
  const {
    avatar,
    characterName,
    hitPoints,
    armorClass,
    experience,
    levels,
    gender,
    race,
    card,
  } = props;

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
  console.log("AvatarStatus", avatar);
  return card ? (
    <StatusCard
      avatar={avatar}
      characterName={characterName}
      conditions={conditions}
      hitPoints={hitPoints}
      armorClass={armorClass}
      experience={xp}
      levels={levels}
      gender={gender}
      race={race}
    ></StatusCard>
  ) : (
    <StatusTable
      avatar={avatar}
      characterName={characterName}
      conditions={conditions}
      hitPoints={hitPoints}
      armorClass={armorClass}
      experience={xp}
      levels={levels}
      gender={gender}
      race={race}
    ></StatusTable>
  );
};

export default Status;
