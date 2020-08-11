import React from 'react';

const Spells = (props) => {
    const {
        name,
        lvl,
        time,
        range,
        hit,
        DC,
        duration,
        components,
    } = props;

    return (
        <div className="container">
            <div>Name: {name}</div>
            <div>Level: {lvl}</div>
            <div>Time: {time}</div>
            <div>Range: {range}</div>
            <div>hit: {hit}</div>
            <div>DC: {DC}</div>
            {duration ?
                <div>Duration: {duration}</div>
                : null }
            <div>{components.map((component,key) => {
                return (
                    <div>{component[1]
                    ? "V": null}
                    {component[2]
                    ? "S": null}
                    {component[3]
                    ? "M": null}
                    </div>
                )
            })}
            </div>
        </div>
    );
};

export default Spells;