import React from "react";

const Spells = (props) => {
  const { name, lvl, time, range, hit, DC, duration, components } = props;
  console.log(components);
    return (
      <div className="container">
        <div>Name: {name}</div>
        <div>Level: {lvl}</div>
        <div>{time === 1
              ? "1A"
              : time === 3
              ? "1BA"
              : null}
        </div>
        <div>Range: {range}</div>
        <div>hit: {hit}</div>
        <div> SaveDC: {" "}
          {DC ?
            {
              1: "STR",
              2: "DEX",
              3: "CON",
              4: "INT",
              5: "WIS",
              6: "CHA"
            }[DC]
          :"--"}
        </div>
        {duration ? <div>Duration: {duration}</div> : null}
        {components ? (
          <div>
            Components:{" "}
            {components.map((component, key) => {
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
        ) : null}
      </div>
    );
};

export default Spells;
