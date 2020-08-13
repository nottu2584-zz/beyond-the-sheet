import React from 'react';

const SpellBook = (props) => {
    const {
        cantripsKnown,
        spellsKnown,
        spellSlots,
    } = props;

    return (
        <div className="container">
            <div>Cantrips Known: {cantripsKnown}</div>
            <div>Spells Known: {spellsKnown}</div>
            <div>{spellSlots}</div>
            <div>{props.children}</div>
        </div>
    )
}

export default SpellBook;
