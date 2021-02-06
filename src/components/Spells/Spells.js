import { Paper, TableContainer, TableFooter } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { SpellCard } from "../SpellCard";

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
    school,
    avatar,
    link = "https://www.dndbeyond.com/spells/",
    characterName,
  } = props;
  
  const generateLink = (name) => {
    const elements = name.split(" ");
    return link + elements.join("-").toLowerCase();
  };

  return (
    <SpellCard
      avatar={avatar}
      spellName={name}
      characterName={characterName}
      school={school}
      level={lvl}
      time={time === 1 ? "1A" : time === 3 ? "1BA" : null}
      hitDc={
        hit
          ? hit
          : DC
          ? {
              1: "STR",
              2: "DEX",
              3: "CON",
              4: "INT",
              5: "WIS",
              6: "CHA",
            }[DC]
          : "--"
      }
      duration={duration ? duration : null}
      range={range}
      link={generateLink(name)}
      components={
        components
          ? components.map((component, key) => {
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
            })
          : null
      }
    ></SpellCard>
  );
  //   <TableRow>
  //     <TableCell></TableCell>
  //     <TableCell>{name}</TableCell>
  //     <TableCell>{lvl}</TableCell>
  //     <TableCell>{time === 1 ? "1A" : time === 3 ? "1BA" : null}</TableCell>
  //     <TableCell>{range}</TableCell>
  //     <TableCell>
  //       {hit
  //         ? hit
  //         : DC
  //         ? {
  //             1: "STR",
  //             2: "DEX",
  //             3: "CON",
  //             4: "INT",
  //             5: "WIS",
  //             6: "CHA",
  //           }[DC]
  //         : "--"}
  //     </TableCell>
  //     <TableCell>{duration ? duration : null}</TableCell>
  //     <TableCell>
  //       {components
  //         ? components.map((component, key) => {
  //             switch (component) {
  //               case 1:
  //                 return "V";
  //               case 2:
  //                 return "S";
  //               case 3:
  //                 return "M";
  //               default:
  //                 return null;
  //             }
  //           })
  //         : null}
  //     </TableCell>
  //   </TableRow>
  // );
};

export default Spells;
