import React from 'react';

const SpellBook = (props) => {
    const {
        cantripsKnown,
        spellsKnown,
        spellSlots,
    } = props;

    return (
        <div className="container">
            <div>{cantripsKnown}</div>
            <div>{spellsKnown}</div>
            <div>{spellSlots}</div>
            <div>{props.children}</div>
        </div>
    )
}

export default SpellBook;
