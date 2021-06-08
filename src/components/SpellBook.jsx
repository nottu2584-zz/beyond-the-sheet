import React from "react";

const SpellBook = (props) => {
  const { cantripsKnown, characterName, spellsKnown, spellSlots } = props;

  console.log("Spells Slot", spellSlots);

  return (
    <div className="container">
      <div>{characterName}</div>
      <div>Cantrips Known: {cantripsKnown}</div>
      <div>Spells Known: {spellsKnown}</div>
      <div>
        {spellSlots.map((index, acc) =>
          index !== 0 ? `Level ${acc + 1}: ${index}` : null
        )}
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default SpellBook;
