import React from "react";

const Spells = (props) => {
  const { name, lvl, time, range, hit, DC, duration, components } = props;

    return (
        <div className="container">
            <div>Name: {name}</div>
            <div>Level: {lvl}</div>
            <div>Time: {time}</div>
            <div>Range: {range}</div>
            <div>hit: {hit}</div>
            <div>DC: {DC}</div>
            {duration ? <div>Duration: {duration}</div>: null }
            {components ? 
                <div>{components.map((component,key) => {
                    switch (component) {
                        case 1:
                            return "V";
                        case 2:
                            return "S";
                        case 3:
                            return "M";
                        default:
                            return null;
                    }
                })}
                </div>
            :"prueba"}
      </div>
    );
};

export default Spells;
