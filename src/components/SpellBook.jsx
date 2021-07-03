import { Link, TableContainer } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";

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

const Levels = () => {
  return { levels: new Array(10) };
};

const SpellBook = (props) => {
  const [toggle, setToggle] = useState(false);

  const handleChange = (event) => {
    setToggle(!toggle);
  };

  const classes = useStyles();
  const { characters } = props;

  //TODO: ViewCharactersByLevel && ViewSpellsByLevel
  const SpellKeeper = (characters) => {
    const ViewCharactersByLevel = Levels();
    const ViewSpellsByLevel = Levels();

    for (let character of characters) {
      const { id, classSpells, spells } = character.data;

      for (let key = 0; key < 10; key++) {
        if (!Array.isArray(ViewCharactersByLevel.levels[key]))
          ViewCharactersByLevel.levels[key] = [];

        if (!Array.isArray(ViewSpellsByLevel.levels[key]))
          ViewSpellsByLevel.levels[key] = [];

        const spellsClass = [].concat.apply(
          [],
          classSpells.map((characterClass) =>
            getSpells(characterClass.spells, key)
          )
        );
        const spellsBackground = getSpells(spells.background, key);

        const spellsClassSpeciality = getSpells(spells.class, key);
        const spellsFeat = getSpells(spells.feat, key);
        const spellsItem = getSpells(spells.item, key);
        const spellsRace = getSpells(spells.race, key);

        //TODO: Substituir el array por un objeto con dos atributos
        const characterLevel = {
          id: id,
          level: [].concat.apply(
            spellsClass
              .concat(
                spellsBackground,
                spellsClassSpeciality,
                spellsFeat,
                spellsItem,
                spellsRace
              )
              .filter((spell) => spell != null)
          ),
        };

        characterLevel.level.length &&
          ViewCharactersByLevel.levels[key].push(characterLevel);

        //TODO: crear una funcion para el global de hechizos
        const level = parseSpells(
          id,
          ViewSpellsByLevel.levels,
          key,
          spellsClass
            .concat(
              spellsBackground,
              spellsClassSpeciality,
              spellsFeat,
              spellsItem,
              spellsRace
            )
            .filter((spell) => spell != null)
        );

        ViewSpellsByLevel.levels[key] = ViewSpellsByLevel.levels[key]
          .concat(level)
          .filter((spell) => spell != null);
      }
    }
    return { ViewCharactersByLevel, ViewSpellsByLevel };
  };

  const getSpells = (spellBook, key) => {
    if (Array.isArray(spellBook) && spellBook.length) {
      return spellBook.filter((spell) => {
        return spell.definition.level === key;
      });
    } else return null;
  };

  const parseSpells = (characterId, levels, key, spellBook) => {
    if (Array.isArray(spellBook) && spellBook.length) {
      return spellBook.map((spell) => {
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

  console.log("SpellKeeper", SpellKeeper(characters));

  const generateLink = (name) => {
    return (
      "https://www.dndbeyond.com/spells/" +
      name
        .split(/[’']/)
        .join("")
        .split(/[" "/]/)
        .join("-")
        .toLowerCase()
    );
  };
  return (
    <>
      <Switch onChange={handleChange} color="default"></Switch>
      {console.log("Toggle", toggle)}
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
          {toggle ? (
            <TableRow>
              {characters &&
                SpellKeeper(characters).ViewSpellsByLevel.levels.map(
                  (level, key) => (
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
                  )
                )}
            </TableRow>
          ) : (
            <TableRow>
              {characters &&
                SpellKeeper(characters).ViewCharactersByLevel.levels.map(
                  (level, key) => (
                    <TableCell key={key}>
                      <ul>
                        {level.map((characterLevel, key) => (
                          <React.Fragment key={characterLevel.id}>
                            <li>{characterLevel.id}</li>
                            {characterLevel.level.map((spell) => (
                              <li>
                                <Link
                                  href={generateLink(spell.definition.name)}
                                  target="_blank"
                                >
                                  {spell.definition.name}
                                </Link>
                              </li>
                            ))}
                          </React.Fragment>
                        ))}
                      </ul>
                    </TableCell>
                  )
                )}
            </TableRow>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default SpellBook;
