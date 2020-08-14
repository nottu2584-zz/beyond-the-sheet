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

      // Character levels
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

      // Half-proficiency flag
      const halfProficiency = Object.keys(
        action.payload.data.modifiers
      ).some((modifier) => isHalfProficiency(modifier));

      // Stat array
      const [
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
      ] = action.payload.data.stats.map((stat, key) => {
        return action.payload.data.overrideStats[key].value
          ? // Custom Override
            action.payload.data.overrideStats[key].value
          : // Base + Bonus + Mods
            stat.value +
              action.payload.data.bonusStats[key].value +
              Object.keys(action.payload.data.modifiers)
                .map((index) =>
                  action.payload.data.modifiers[index]
                    .filter(
                      (modifier) =>
                        isStatBonus(modifier, key) ||
                        isStatOverride(modifier, key)
                    )
                    .reduce(
                      (acc, modifier) =>
                        isStatOverride(modifier, key)
                          ? modifier.value -
                            stat.value -
                            action.payload.data.bonusStats[key].value
                          : acc + modifier.value,
                      0
                    )
                )
                .reduce((acc, b) => acc + b, 0);
      });

      // Skill array
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
      ] = characterSkills((key) => {
        return Object.keys(action.payload.data.modifiers).map((modifier) => {
          return {
            proficiency: isSkillProficiency(modifier, key),
            expertise: isSkillExpertise(modifier, key),
            halfProficiency:
              halfProficiency &&
              !isSkillProficiency(modifier, key) &&
              !isSkillExpertise(modifier, key),
          };
        });
      });

      return !current.includes(true)
        ? {
            ...state,
            characters: [
              ...state.characters,
              {
                ...action.payload,
                stats: {
                  strength: strength,
                  dexterity: dexterity,
                  constitution: constitution,
                  intelligence: intelligence,
                  wisdom: wisdom,
                  charisma: charisma,
                },
                statsModifiers: {
                  strength: stringifyModStats(strength),
                  dexterity: stringifyModStats(dexterity),
                  constitution: stringifyModStats(constitution),
                  intelligence: stringifyModStats(intelligence),
                  wisdom: stringifyModStats(wisdom),
                  charisma: stringifyModStats(charisma),
                },
                skills: {
                  acrobatics: stringifyModSkills(
                    dexterity,
                    levels.total,
                    acrobatics.proficiency,
                    acrobatics.expertise,
                    acrobatics.halfProficiency
                  ),
                  animalHandling: stringifyModSkills(
                    wisdom,
                    levels.total,
                    animalHandling.proficiency,
                    animalHandling.expertise,
                    animalHandling.halfProficiency
                  ),
                  arcana: stringifyModSkills(
                    intelligence,
                    levels.total,
                    arcana.proficiency,
                    arcana.expertise,
                    arcana.halfProficiency
                  ),
                  athletics: stringifyModSkills(
                    dexterity,
                    levels.total,
                    athletics.proficiency,
                    athletics.expertise,
                    athletics.halfProficiency
                  ),
                  deception: stringifyModSkills(
                    charisma,
                    levels.total,
                    deception.proficiency,
                    deception.expertise,
                    deception.halfProficiency
                  ),
                  history: stringifyModSkills(
                    intelligence,
                    levels.total,
                    history.proficiency,
                    history.expertise,
                    history.halfProficiency
                  ),
                  insight: stringifyModSkills(
                    wisdom,
                    levels.total,
                    insight.proficiency,
                    insight.expertise,
                    insight.halfProficiency
                  ),
                  intimidation: stringifyModSkills(
                    charisma,
                    levels.total,
                    intimidation.proficiency,
                    intimidation.expertise,
                    intimidation.halfProficiency
                  ),
                  investigation: stringifyModSkills(
                    wisdom,
                    levels.total,
                    investigation.proficiency,
                    investigation.expertise,
                    investigation.halfProficiency
                  ),
                  nature: stringifyModSkills(
                    intelligence,
                    levels.total,
                    nature.proficiency,
                    nature.expertise,
                    nature.halfProficiency
                  ),
                  perception: stringifyModSkills(
                    wisdom,
                    levels.total,
                    perception.proficiency,
                    perception.expertise,
                    perception.halfProficiency
                  ),
                  performance: stringifyModSkills(
                    charisma,
                    levels.total,
                    performance.proficiency,
                    performance.expertise,
                    performance.halfProficiency
                  ),
                  persuasion: stringifyModSkills(
                    charisma,
                    levels.total,
                    persuasion.proficiency,
                    persuasion.expertise,
                    persuasion.halfProficiency
                  ),
                  religion: stringifyModSkills(
                    intelligence,
                    levels.total,
                    religion.proficiency,
                    religion.expertise,
                    religion.halfProficiency
                  ),
                  sleightOfHand: stringifyModSkills(
                    dexterity,
                    levels.total,
                    sleightOfHand.proficiency,
                    sleightOfHand.expertise,
                    sleightOfHand.halfProficiency
                  ),
                  stealth: stringifyModSkills(
                    dexterity,
                    levels.total,
                    stealth.proficiency,
                    stealth.expertise,
                    stealth.halfProficiency
                  ),
                  survival: stringifyModSkills(
                    wisdom,
                    levels.total,
                    survival.proficiency,
                    survival.expertise,
                    survival.halfProficiency
                  ),
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

const isStatOverride = (modifier, key) => {
  return (
    isStat(modifier) &&
    modifier.type === "set" &&
    modifier.subType.replace("-score", "") === characterStats[key]
  );
};

const isStatBonus = (modifier, key) => {
  return (
    isStat(modifier) &&
    modifier.type === "bonus" &&
    modifier.subType.replace("-score", "") === characterStats[key]
  );
};

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
  modifier.subType === "religion" ||
  modifier.subType === "sleight-of-hand" ||
  modifier.subType === "stealth" ||
  modifier.subType === "survival";

const isSkillExpertise = (modifier, key) =>
  isSkill(modifier) &&
  modifier.type === "expertise" &&
  modifier.subType === key;

const isSkillProficiency = (modifier, key) =>
  isSkill(modifier) &&
  modifier.type === "proficiency" &&
  modifier.subType === key;

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
