import { Paper, TableContainer, TableFooter } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
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
    card,
    link = "https://www.dndbeyond.com/spells/",
    characterName,
  } = props;

  const generateLink = (name) => {
    const elements = name.split(" ");
    return link + elements.join("-").toLowerCase();
  };

  return (
    <li>
      <Link href={generateLink(name)} variant="body2" color="inherit">
        {name}
      </Link>
    </li>
  );
};

export default Spells;
