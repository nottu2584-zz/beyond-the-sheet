import React from 'react';

const Spells = (props) => {
    const {
        name,
        lvl,
        time,
        range,
        hitDC,
        duration,
        components,
    } = props;

    return (
        <div className="container">
            <div>Name: {name}</div>
            <div>Level: {lvl}</div>
            <div>Time: {time}</div>
            <div>Range: {range}</div>
            <div>hit/DC: {hitDC}</div>
            {duration ?
                <div>Duration: {duration}</div>
                : null }
            <div>components: {components}</div>
        </div>
    );
};

export default Spells;