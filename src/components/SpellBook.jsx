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

    for (let character of characters) {
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
        isSpellCaster: { value: false, level: 0 },
        isHalfCaster: { value: false, level: 0 },
        isPactMagic: { value: false, level: 0 },
      };
      //TODO: 1r Spellcaster lvl de cada character (comprobar multiclass). 2nd SpellSlots "halfCaster, etc." (sacado de el json)
      // for (let characterClass of classes) {
      //   if (isSpellCaster(characterClass)) {
      //     character.spellCasting.isSpellCaster.value = true;
      //     character.spellCasting.isSpellCaster.level =
      //       character.spellCasting.isSpellCaster.level + characterClass.level;
      //   }
      //   if (isHalfCaster(characterClass)) {
      //     character.spellCasting.isHalfCaster.value = true;
      //     character.spellCasting.isHalfCaster.level =
      //       character.spellCasting.isHalfCaster.level + characterClass.level;
      //   }
      //   if (isPactMagic(characterClass)) {
      //     character.spellCasting.isPactMagic.value = true;
      //     character.spellCasting.isPactMagic.level =
      //       character.spellCasting.isPactMagic.level + characterClass.level;
      //   }
      // }

      // console.log(
      //   "Suma Levels",
      //   character.spellCasting.isHalfCaster.level +
      //     character.spellCasting.isSpellCaster.level
      // );

      // const CharacterSpellCasterSlots =
      //   character.spellCasting.isSpellCaster.value &&
      //   character.spellCasting.isHalfCaster.value
      //     ? spellCasterSlots[
      //         character.spellCasting.isSpellCaster.level +
      //           Math.floor(character.spellCasting.isHalfCaster.level / 2)
      //       ]
      //     : character.spellCasting.isSpellCaster.value
      //     ? spellCasterSlots[character.spellCasting.isSpellCaster.level]
      //     : character.spellCasting.isHalfCaster.value
      //     ? spellCasterSlots[character.spellCasting.isHalfCaster.level - 2]
      //     : null;


      for (let key = 0; key < "spellCasterSlots[spellCasterLevel]"; key++) {
        if (key > 0 && "spellCasterSlots[spellCasterLevel][key]" === 0) break;
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
              .filter((spell) => spell !== null)
          ),
          // levelSpellSlots: key > 0 ? CharacterspellCasterSlots[key - 1] : null,
          // levelSpendSlots: key > 0 ? spellSlots[key - 1].used : null,
          // levelPactMagicSlots:
          //   character.spellCasting.isPactMagic.value && key > 0
          //     ? PactMagicSlots[character.spellCasting.isPactMagic.level][
          //         key - 1
          //       ] !== 0
          //       ? PactMagicSlots[character.spellCasting.isPactMagic.level][
          //           key - 1
          //         ]
          //       : null
          //     : null,
          // levelSpendPactMagicSlots:
          //   key > 0 && key < 6 ? pactMagic[key - 1].used : null,
        };
        // if (
        //   key === 0 ||
        //   characterLevel.levelSpellSlots ||
        //   characterLevel.levelPactMagicSlots
        // )

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
    return (
      name === "Paladin" ||
      name === "Ranger" ||
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
