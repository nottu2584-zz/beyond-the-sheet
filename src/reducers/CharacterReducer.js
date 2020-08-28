import { initialState } from "../components/App";

const characterStats = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

const characterSkills = [
  "acrobatics",
  "animalHandling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleightOfHand",
  "stealth",
  "survival",
];

const CharacterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET":
      const current = state.characters.map(
        (character) => action.payload.data.id === character.data.id
      );

      /**
       * Sets character stats including modifiers
       */
      let [
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
      ] = characterStats.map((stat, key) => {
        return {
          value:
            Object.keys(action.payload.data.modifiers)
              .map((index) =>
                action.payload.data.modifiers[index]
                  .filter((modifier) => isStatBonus(modifier, stat))
                  .reduce((acc, modifier) => acc + modifier.value, 0)
              )
              .reduce((acc, modifier) => acc + modifier, 0) +
            action.payload.data.stats[key].value +
            action.payload.data.bonusStats[key].value,
        };
      });

      /**
       * Sets character stats overrides when necessary, keeping the biggest value
       */
      const statOverrides = characterStats.map((stat) => {
        Object.keys(action.payload.data.modifiers)
          .map((index) =>
            action.payload.data.modifiers[index]
              .filter((modifier) => isStatOverride(modifier, stat))
              .reduce(
                (previousModifier, currentModifier) =>
                  Math.max(previousModifier.value, currentModifier.value),
                0
              )
          )
          .reduce(
            (previousModifier, currentModifier) =>
              Math.max(previousModifier, currentModifier),
            0
          );
      });

      strength = statOverrides[0] || strength;
      dexterity = statOverrides[1] || dexterity;
      constitution = statOverrides[2] || constitution;
      intelligence = statOverrides[3] || intelligence;
      wisdom = statOverrides[4] || wisdom;
      charisma = statOverrides[5] || charisma;

      /**
       * Checks for half proficiency on ability checks (Jack of All Trades, etc.)
       */
      const halfProficiency = Object.keys(
        action.payload.data.modifiers
      ).some((index) =>
        action.payload.data.modifiers[index].some((modifier) =>
          isHalfProficiency(modifier)
        )
      );

      const levels = {
        classes: action.payload.data.classes.map((characterClass, key) => {
          return {
            name: characterClass.definition.name,
            level: characterClass.level,
          };
        }),
        total: action.payload.data.classes.reduce(
          (acc, characterClass) => acc + characterClass.level,
          0
        ),
      };

      /**
       * Sets the character skill array
       */
      const [
        acrobatics,
        animalHandling,
        arcana,
        athletics,
        deception,
        history,
        insight,
        intimidation,
        investigation,
        nature,
        perception,
        performance,
        persuasion,
        religion,
        sleightOfHand,
        stealth,
        survival,
      ] = characterSkills.map((skill) => {
        return {
          expertise: Object.keys(action.payload.data.modifiers).some((index) =>
            action.payload.data.modifiers[index].some((modifier) =>
              isSkillExpertise(modifier, skill)
            )
          ),
          proficiency: Object.keys(
            action.payload.data.modifiers
          ).some((index) =>
            action.payload.data.modifiers[index].some((modifier) =>
              isSkillProficiency(modifier, skill)
            )
          ),
          halfProficiency: halfProficiency,
        };
      });

      const maxHitPoints = action.payload.data.overrideHitPoints
        ? action.payload.data.overrideHitPoints
        : action.payload.data.baseHitPoints +
          (action.payload.data.bonusHitPoints || 0) +
          modStats(constitution.value) * levels.total;

      const hitPoints = {
        current: maxHitPoints - action.payload.data.removedHitPoints,
        max: maxHitPoints,
        temp: action.payload.data.temporaryHitPoints,
      };

      let armorClass = action.payload.data.inventory.reduce((acc, item) => {
        if (item.definition.filterType === "Armor" && item.equipped === true) {
          switch (item.definition.armorTypeId) {
            case 1:
              return acc + item.definition.armorClass + modStats(dexterity.value);
            case 2:
              return (
                acc +
                item.definition.armorClass +
                (modStats(dexterity.value) <= 2 ? modStats(dexterity.value) : 2)
              );
            case 3:
              return acc + item.definition.armorClass;
            case 4:
              return acc + item.definition.armorClass;
            default:
              return acc;
          }
        } else return acc;
      },0);

      armorClass = armorClass ? armorClass: 10 + modStats(dexterity.value);

      const experience = null;
      const conditions = [];

      return !current.includes(true)
        ? {
            ...state,
            characters: [
              ...state.characters,
              {
                ...action.payload,
                armorClass: armorClass,
                conditions: {
                  ...conditions,
                },
                experience: {
                  value: experience,
                  toLevelUp: 0,
                },
                hitPoints: {
                  ...hitPoints,
                  current: 0,
                  max: 0,
                  temp: 0,
                },
                skills: {
                  acrobatics: {
                    ...acrobatics,
                    value: stringifyModSkills(
                      dexterity,
                      levels.total,
                      acrobatics.proficiency,
                      acrobatics.expertise,
                      acrobatics.halfProficiency
                    ),
                  },
                  animalHandling: {
                    ...animalHandling,
                    value: stringifyModSkills(
                      wisdom,
                      levels.total,
                      animalHandling.proficiency,
                      animalHandling.expertise,
                      animalHandling.halfProficiency
                    ),
                  },
                  arcana: {
                    ...arcana,
                    value: stringifyModSkills(
                      intelligence,
                      levels.total,
                      arcana.proficiency,
                      arcana.expertise,
                      arcana.halfProficiency
                    ),
                  },
                  athletics: {
                    ...athletics,
                    value: stringifyModSkills(
                      strength,
                      levels.total,
                      athletics.proficiency,
                      athletics.expertise,
                      athletics.halfProficiency
                    ),
                  },
                  deception: {
                    ...deception,
                    value: stringifyModSkills(
                      charisma,
                      levels.total,
                      deception.proficiency,
                      deception.expertise,
                      deception.halfProficiency
                    ),
                  },
                  history: {
                    ...history,
                    value: stringifyModSkills(
                      intelligence,
                      levels.total,
                      history.proficiency,

                      history.expertise,
                      history.halfProficiency
                    ),
                  },
                  insight: {
                    ...insight,
                    value: stringifyModSkills(
                      wisdom,
                      levels.total,
                      insight.proficiency,
                      insight.expertise,
                      insight.halfProficiency
                    ),
                  },
                  intimidation: {
                    ...intimidation,
                    value: stringifyModSkills(
                      charisma,
                      levels.total,
                      intimidation.proficiency,
                      intimidation.expertise,
                      intimidation.halfProficiency
                    ),
                  },
                  investigation: {
                    ...investigation,
                    value: stringifyModSkills(
                      intelligence,
                      levels.total,
                      investigation.proficiency,
                      investigation.expertise,
                      investigation.halfProficiency
                    ),
                  },
                  nature: {
                    ...nature,
                    value: stringifyModSkills(
                      intelligence,
                      levels.total,
                      nature.proficiency,
                      nature.expertise,
                      nature.halfProficiency
                    ),
                  },
                  perception: {
                    ...perception,
                    value: stringifyModSkills(
                      wisdom,
                      levels.total,
                      perception.proficiency,
                      perception.expertise,
                      perception.halfProficiency
                    ),
                  },
                  performance: {
                    ...performance,
                    value: stringifyModSkills(
                      charisma,
                      levels.total,
                      performance.proficiency,
                      performance.expertise,
                      performance.halfProficiency
                    ),
                  },
                  persuasion: {
                    ...persuasion,
                    value: stringifyModSkills(
                      charisma,
                      levels.total,
                      persuasion.proficiency,
                      persuasion.expertise,
                      persuasion.halfProficiency
                    ),
                  },
                  religion: {
                    ...religion,
                    value: stringifyModSkills(
                      intelligence,
                      levels.total,
                      religion.proficiency,
                      religion.expertise,
                      religion.halfProficiency
                    ),
                  },
                  sleightOfHand: {
                    ...sleightOfHand,
                    value: stringifyModSkills(
                      dexterity,
                      levels.total,
                      sleightOfHand.proficiency,
                      sleightOfHand.expertise,
                      sleightOfHand.halfProficiency
                    ),
                  },
                  stealth: {
                    ...stealth,
                    value: stringifyModSkills(
                      dexterity,
                      levels.total,
                      stealth.proficiency,
                      stealth.expertise,
                      stealth.halfProficiency
                    ),
                  },
                  survival: {
                    ...survival,
                    value: stringifyModSkills(
                      wisdom,
                      levels.total,
                      survival.proficiency,
                      survival.expertise,
                      survival.halfProficiency
                    ),
                  },
                },
                stats: {
                  strength: {
                    ...strength,
                    modifier: stringifyModStats(strength),
                  },
                  dexterity: {
                    ...dexterity,
                    modifier: stringifyModStats(dexterity),
                  },
                  constitution: {
                    ...constitution,
                    modifier: stringifyModStats(constitution),
                  },
                  intelligence: {
                    ...intelligence,
                    modifier: stringifyModStats(intelligence),
                  },
                  wisdom: {
                    ...wisdom,
                    modifier: stringifyModStats(wisdom),
                  },
                  charisma: {
                    ...charisma,
                    modifier: stringifyModStats(charisma),
                  },
                },
              },
            ],
          }
        : { ...state };
    case "RESET":
      return {
        ...state,
        characters: [],
      };
    default:
      return state;
  }
};

const isStatOverride = (modifier, stat) =>
  isStat(modifier) &&
  modifier.type === "set" &&
  modifier.subType.replace("-score", "") === stat;

const isStatBonus = (modifier, stat) =>
  isStat(modifier) &&
  modifier.type === "bonus" &&
  modifier.subType.replace("-score", "") === stat;

const isStat = (modifier) =>
  modifier.subType === "strength-score" ||
  modifier.subType === "dexterity-score" ||
  modifier.subType === "constitution-score" ||
  modifier.subType === "intelligence-score" ||
  modifier.subType === "wisdom-score" ||
  modifier.subType === "charisma-score";

const isSkill = (modifier) =>
  modifier.subType === "acrobatics" ||
  modifier.subType === "animal-handling" ||
  modifier.subType === "arcana" ||
  modifier.subType === "athletics" ||
  modifier.subType === "deception" ||
  modifier.subType === "history" ||
  modifier.subType === "insight" ||
  modifier.subType === "intimidation" ||
  modifier.subType === "investigation" ||
  modifier.subType === "nature" ||
  modifier.subType === "perception" ||
  modifier.subType === "persuasion" ||
  modifier.subType === "performance" ||
  modifier.subType === "religion" ||
  modifier.subType === "sleight-of-hand" ||
  modifier.subType === "stealth" ||
  modifier.subType === "survival";

const isSkillExpertise = (modifier, key) =>
  isSkill(modifier) &&
  modifier.type === "expertise" &&
  modifier.subType === key;

const isSkillProficiency = (modifier, key) => {
  return (
    isSkill(modifier) &&
    modifier.type === "proficiency" &&
    modifier.subType === key
  );
};

const isHalfProficiency = (modifier) =>
  modifier.type === "half-proficiency" && modifier.subtype === "ability-checks";

const modStats = (stat) => {
  return Math.floor((stat - 10) / 2);
};

const modSkills = (
  skill,
  levels,
  proficiency = false,
  expertise = false,
  halfProficiency = false
) => {
  const compProf = Math.ceil(levels / 4) + 1;
  return proficiency
    ? expertise
      ? modStats(skill) + 2 * compProf
      : modStats(skill) + compProf
    : halfProficiency
    ? modStats(skill) + Math.floor(compProf / 2)
    : modStats(skill);
};

const stringifyMod = (modifier) => {
  return modifier > 0 ? "+" + modifier : modifier;
};

const stringifyModStats = (modifier) => {
  return stringifyMod(modStats(modifier));
};

const stringifyModSkills = (
  modifier,
  level,
  proficiency = false,
  expertise = false,
  halfProficiency = false
) => {
  return stringifyMod(
    modSkills(modifier, level, proficiency, expertise, halfProficiency)
  );
};

export default CharacterReducer;
