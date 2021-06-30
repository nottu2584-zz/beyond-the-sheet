import {
  Avatar,
  Chip,
  Paper,
  TableContainer,
  TableFooter,
  Link,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CloseOutlined } from "@material-ui/icons";
import React from "react";


const useStyles = makeStyles({
  table: {},
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const SpellNames = [];

const SpellBook = (props) => {
  const classes = useStyles();
  const { characters } = props;

  const SpellKeeper = (characters) => {
    let levels = new Array(10);
    for (let character of characters) {
      const { id, classSpells, spells } = character.data;

      for (let key = 0; key < levels.length; key++) {
        if (!Array.isArray(levels[key])) levels[key] = [];
        const spellsClass = [].concat.apply(
          [],
          classSpells.map((characterClass) =>
            getSpells(id, characterClass.spells, key, levels)
          )
        );

        const spellsBackground = getSpells(id, spells.background, key, levels);
        const spellsClassSpeciality = getSpells(id, spells.class, key, levels);
        const spellsFeat = getSpells(id, spells.feat, key, levels);
        const spellsItem = getSpells(id, spells.item, key, levels);
        const spellsRace = getSpells(id, spells.race, key, levels);

        const level = levels[key]
          .concat(
            spellsClass,
            spellsBackground,
            spellsClassSpeciality,
            spellsFeat,
            spellsItem,
            spellsRace
          )
          .filter((spell) => spell != null);
        levels[key] = level;
      }
    }
    return levels;
  };

  const getSpells = (characterId, spellBook, key, levels) => {
    if (Array.isArray(spellBook) && spellBook.length) {
      return spellBook
        .filter((spell) => {
          return spell.definition.level === key;
        })
        .map((spell) => {
          for (let [originalSpellKey, originalSpell] of Object.entries(
            levels[key]
          )) {
            if (originalSpell.definition.id === spell.definition.id) {
              levels[key][originalSpellKey] = {
                ...originalSpell,
                characters: [...originalSpell.characters, characterId],
              };
              return;
            }
          }
          return {
            ...spell,
            characters: [
              ...(spell.characters ? spell.characters : []),
              characterId,
            ],
          };
        });
    } else return null;
  };

  const generateLink = (name) => {
    return (
      "https://www.dndbeyond.com/spells/" +
      name
        .split(/[" "/]/)
        .join("-")
        .toLowerCase()
        .split("’")
        .join("")
    );
  };

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableRow>
          <TableCell>CANTRIPS</TableCell>
          <TableCell>1ST</TableCell>
          <TableCell>2ND</TableCell>
          <TableCell>3RD</TableCell>
          <TableCell>4TH</TableCell>
          <TableCell>5TH</TableCell>
          <TableCell>6TH</TableCell>
          <TableCell>7TH</TableCell>
          <TableCell>8TH</TableCell>
          <TableCell>9TH</TableCell>
        </TableRow>
        <TableRow>
          {characters &&
            SpellKeeper(characters).map((level, key) => (
              <TableCell key={key}>
                <ul>
                  {level.map((spell) => (
                    <li>
                      <Link
                        href={generateLink(spell.definition.name)}
                        target="_blank"
                      >
                        {spell.definition.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </TableCell>
            ))}
        </TableRow>
      </Table>
    </TableContainer>
  );
};

export default SpellBook;

// <div className="container">
//   <div>{characterName}</div>
//   <div>Cantrips Known: {cantripsKnown}</div>
//   <div>Spells Known: {spellsKnown}</div>
//   <div>
//     {spellSlots.map((index, acc) =>
//       index !== 0 ? `Level ${acc + 1}: ${index}` : null
//     )}
//   </div>
//   <div>{props.children}</div>
// </div>
