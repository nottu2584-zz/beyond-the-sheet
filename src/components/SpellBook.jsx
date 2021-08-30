import { Link, TableContainer } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import { SpellCard } from ".";

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

const spellCasterSlots = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 0, 0, 0, 0],
  [4, 2, 0, 0, 0, 0, 0, 0, 0],
  [4, 3, 0, 0, 0, 0, 0, 0, 0],
  [4, 3, 2, 0, 0, 0, 0, 0, 0],
  [4, 3, 3, 0, 0, 0, 0, 0, 0],
  [4, 3, 3, 1, 0, 0, 0, 0, 0],
  [4, 3, 3, 2, 0, 0, 0, 0, 0],
  [4, 3, 3, 3, 1, 0, 0, 0, 0],
  [4, 3, 3, 3, 2, 0, 0, 0, 0],
  [4, 3, 3, 3, 2, 1, 0, 0, 0],
  [4, 3, 3, 3, 2, 1, 0, 0, 0],
  [4, 3, 3, 3, 2, 1, 1, 0, 0],
  [4, 3, 3, 3, 2, 1, 1, 0, 0],
  [4, 3, 3, 3, 2, 1, 1, 1, 0],
  [4, 3, 3, 3, 2, 1, 1, 1, 0],
  [4, 3, 3, 3, 2, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 2, 1, 1],
];

const SpellBook = (props) => {
  const [toggle, setToggle] = useState(false);
  const classes = useStyles();
  const { characters } = props;

  if (!characters.length) return null;

  const handleChange = (event) => {
    setToggle(!toggle);
  };

  //TODO: ViewCharactersByLevel && ViewSpellsByLevel
  const SpellKeeper = (characters) => {
    const ViewCharactersByLevel = Levels();
    const ViewSpellsByLevel = Levels();

    for (let [characterKey, character] of Object.entries(characters)) {
      const {
        avatarUrl,
        classes,
        id,
        name,
        classSpells,
        spells,
        spellSlots,
        pactMagic,
      } = character.data;

      //TODO: class slots && multiclass
      character.spellCasting = {
        spellCasterSlots: null,
        spellCasterLevel: 0,
        pactMagicSlots: null,
        pactMagicLevel: 0,
      };

      const spellCasterClasses = classes.filter(
        (characterClass) =>
          isSpellCaster(characterClass) ||
          isHalfCaster(characterClass) ||
          isThirdCaster(characterClass)
      );

      const pactMagicClasses = classes.filter((characterClass) =>
        isPactMagic(characterClass)
      );

      if (spellCasterClasses.length > 1) {
        character.spellCasting.spellCasterSlots = spellCasterSlots;
        for (let characterClass of spellCasterClasses) {
          character.spellCasting.spellCasterLevel = isSpellCaster(
            characterClass
          )
            ? character.spellCasting.spellCasterLevel + characterClass.level
            : isHalfCaster(characterClass)
            ? character.spellCasting.spellCasterLevel +
              Math.floor(characterClass.level / 2)
            : character.spellCasting.spellCasterLevel +
              Math.floor(characterClass.level / 3);
          console.log(
            characterClass.definition.name,
            character.spellCasting.spellCasterLevel
          );
        }
      } else if (spellCasterClasses) {
        character.spellCasting.spellCasterSlots =
          spellCasterClasses[0].definition.spellRules.levelSpellSlots;
        character.spellCasting.spellCasterLevel = spellCasterClasses[0].level;
      }
      console.log("pactMagic", pactMagicClasses);

      if (pactMagicClasses.length > 0) {
        character.spellCasting.pactMagicSlots =
          pactMagicClasses[0].definition.spellRules.levelSpellSlots;
        character.spellCasting.pactMagicLevel = pactMagicClasses[0].level;
      }

      console.log(
        "SpellCasting",
        character.spellCasting.spellCasterSlots[
          character.spellCasting.spellCasterLevel
        ]
      );

      for (let key = 0; key < 10; key++) {
        if (
          key > 0 &&
          character.spellCasting.spellCasterSlots[
            character.spellCasting.spellCasterLevel
          ][key - 1] === 0
        )
          break;
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
          character: {
            id: id,
            avatar: avatarUrl,
            characterName: name,
          },
          level: [].concat.apply(
            spellsClass
              .concat(
                spellsBackground,
                spellsClassSpeciality,
                spellsFeat,
                spellsItem,
                spellsRace
              )
              .filter(
                (spell) => spell !== null && key >= spell.definition.level
              )
              .map((parseSpell) => {
                parseSpell.scaledLevel =
                  parseSpell.definition.level !== key ? true : false;
                return parseSpell;
              })
          ),
          spellCasting: {
            spellSlots:
              key !== 0
                ? character.spellCasting.spellCasterSlots[
                    character.spellCasting.spellCasterLevel
                  ][key - 1]
                : null,
            slotsSpended: key !== 0 ? spellSlots[key - 1].used : null,
            pactMagicSlots : null,
            pactMagicSlotsSpended : null,
          },
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
            .filter((spell) => spell != null && spell.definition.level === key)
        );

        ViewSpellsByLevel.levels[key] = ViewSpellsByLevel.levels[key]
          .concat(level)
          .filter((spell) => spell != null);
      }
      if (character.spellCasting.pactMagicSlots) {
        for (let key = 1; key < 6; key++) {
          ViewCharactersByLevel.levels[key][
            characterKey
          ].spellCasting.pactMagicSlots =
            character.spellCasting.pactMagicSlots[
              character.spellCasting.pactMagicLevel
            ][key - 1] !== 0
              ? character.spellCasting.pactMagicSlots[
                  character.spellCasting.pactMagicLevel
                ][key - 1]
              : null;
        }
      }
    }
    return { ViewCharactersByLevel, ViewSpellsByLevel };
  };

  const getSpells = (spellBook, key) => {
    if (Array.isArray(spellBook) && spellBook.length) {
      return spellBook.filter(
        (spell) =>
          spell.definition.level === key ||
          (spell.definition.scaleType &&
            spell.definition.level !== 0 &&
            key !== 0)
      );
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

  const isSpellCaster = (characterClass) => {
    const { name } = characterClass.definition;
    return (
      name === "Artificer" ||
      name === "Bard" ||
      name === "Cleric" ||
      name === "Druid" ||
      name === "Sorcerer" ||
      name === "Wizard"
    );
  };

  const isHalfCaster = (characterClass) => {
    const { name } = characterClass.definition;
    return name === "Paladin" || name === "Ranger";
  };

  const isThirdCaster = (characterClass) => {
    const { name } = characterClass.definition;
    return (
      (name === "Fighter" &&
        characterClass.subclassDefinition?.name === "Eldritch Knight") ||
      (name === "Rogue" &&
        characterClass.subclassDefinition?.name === "Arcane Trickster")
    );
  };

  const isPactMagic = (characterClass) => {
    const { name } = characterClass.definition;
    return name === "Warlock";
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
                            <SpellCard
                              characterName={
                                characterLevel.character.characterName
                              }
                              slots={characterLevel.spellCasting.spellSlots}
                              slotsSpended={
                                characterLevel.spellCasting.slotsSpended
                              }
                              avatar={characterLevel.character.avatar}
                            >
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
                            </SpellCard>
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
