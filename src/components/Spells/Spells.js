import React from 'react';

const Spells = (props) => {
    const {
        name,
        time,
        range,
        hitDC,
        duration,
        components,
    } = props;

    return (
        <div className="container">
            <div>{name}</div>
            <div>{time}</div>
            <div>{range}</div>
            <div>{hitDC}</div>
            <div>{duration}</div>
            <div>{components}</div>
        </div>
    );
};

export default Spells;