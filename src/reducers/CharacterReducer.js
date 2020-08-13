import { initialState } from "../components/App";

const characterStats = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

const CharacterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET":
      const current = state.characters.map(
        (character) => action.payload.data.id === character.data.id
      );

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
                        isBonus(modifier, key) || isOverride(modifier, key)
                    )
                    .reduce(
                      (acc, modifier) =>
                        isOverride(modifier, key)
                          ? modifier.value -
                            stat.value -
                            action.payload.data.bonusStats[key].value
                          : acc + modifier.value,
                      0
                    )
                )
                .reduce((acc, b) => acc + b, 0);
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
                  acrobatics: stringifyModSkills(dexterity),
                  animalHandling: stringifyModSkills(wisdom),
                  arcana: stringifyModSkills(intelligence),
                  athletics: stringifyModSkills(dexterity),
                  deception: stringifyModSkills(charisma),
                  history: stringifyModSkills(intelligence),
                  insight: stringifyModSkills(wisdom),
                  intimidation: stringifyModSkills(charisma),
                  investigation: stringifyModSkills(wisdom),
                  nature: stringifyModSkills(intelligence),
                  perception: stringifyModSkills(wisdom),
                  performance: stringifyModSkills(charisma),
                  persuasion: stringifyModSkills(charisma),
                  religion: stringifyModSkills(intelligence),
                  sleightOfHand: stringifyModSkills(dexterity),
                  stealth: stringifyModSkills(dexterity),
                  survival: stringifyModSkills(wisdom),
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

const isOverride = (modifier, key) => {
  return (
    isStat(modifier) &&
    modifier.type === "set" &&
    modifier.subType.replace("-score", "") === characterStats[key]
  );
};

const isBonus = (modifier, key) => {
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

const modStats = (stat) => {
  return Math.floor((stat - 10) / 2);
};

const modSkills = (skill, proficiency = false, expertise = false) => {
  return proficiency
    ? expertise
      ? modStats(skill) + 2*(Math.ceil(proficiency / 4) + 1)
      : modStats(skill) + (Math.ceil(proficiency / 4) + 1)
    : modStats(skill);
};

const stringifyMod = (modifier) => {
  return modifier > 0 ? "+" + modifier: modifier;
}

const stringifyModStats = (modifier) => {
  return stringifyMod(modStats(modifier));
}

const stringifyModSkills = (modifier, proficiency = false, expertise = false) => {
  return stringifyMod(modSkills(modifier, proficiency, expertise ))
}
 
export default CharacterReducer;
