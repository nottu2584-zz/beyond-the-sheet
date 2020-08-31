import { initialState } from "../components/App";

const characterAbilities = [
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
      const inventory = action.payload.data.inventory;

      const current = state.characters.map(
        (character) => action.payload.data.id === character.data.id
      );

      /**
       * Sets character abilities including modifiers
       */
      let [
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
      ] = characterAbilities.map((stat, key) => {
        return {
          value:
            Object.keys(action.payload.data.modifiers)
              .map((index) =>
                action.payload.data.modifiers[index]
                  .filter((modifier) => isAbilityBonus(modifier, stat))
                  .reduce((acc, modifier) => acc + modifier.value, 0)
              )
              .reduce((acc, modifier) => acc + modifier, 0) +
            action.payload.data.stats[key].value +
            action.payload.data.bonusStats[key].value,
        };
      });

      /**
       * Sets character abilities overrides when necessary, keeping the biggest value
       */
      const statOverrides = characterAbilities.map((stat) => {
        return Object.keys(action.payload.data.modifiers)
          .map((index) =>
            action.payload.data.modifiers[index]
              .filter((modifier) => isAbilityOverride(modifier, stat))
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
          constitution.modifier * levels.total;

      const hitPoints = {
        current: maxHitPoints - action.payload.data.removedHitPoints,
        max: maxHitPoints,
        temp: action.payload.data.temporaryHitPoints,
      };

      /**
       * Armor class override
       */
      const armorClassOverride = action.payload.data.characterValues
        .filter((value) => value.typeId === 1)
        .reduce((acc, value) => acc + value.value, 0);

      /**
       * Additional armor bonuses
       */
      const armorBonus = action.payload.data.characterValues
        .filter((value) => value.typeId === 2 || value.typeId === 3)
        .reduce((acc, value) => acc + value.value, 0);

      /**
       * Base armor override
       */
      const baseArmor = action.payload.data.characterValues
        .filter((value) => value.typeId === 4)
        .reduce((acc, value) => acc + value.value, 0);

      const equippedArmor = Math.max(
        ...[
          maxArmor(inventory, isLightArmor) + modifier(dexterity.value),
          maxArmor(inventory, isMediumArmor) + modifier(dexterity.value) <= 2
            ? modifier(dexterity.value)
            : 2,
          maxArmor(inventory, isHeavyArmor),
        ]
      );

      console.log("armor", equippedArmor);
      console.log("isLightArmor", maxArmor(inventory, isLightArmor));
      console.log("isMediumArmor", maxArmor(inventory, isMediumArmor));
      console.log("isHeavyArmor", maxArmor(inventory, isHeavyArmor));

      let armorClass = inventory
        .filter(
          (item) =>
            item.definition.filterType === "Armor" && item.equipped === true
        )
        .reduce((acc, item) => {
          switch (item.definition.armorTypeId) {
            case 1:
              // Light armor
              return baseArmor
                ? baseArmor
                : acc + item.definition.armorClass + modifier(dexterity.value);
            case 2:
              // Medium armor
              return baseArmor
                ? baseArmor
                : acc +
                    item.definition.armorClass +
                    (modifier(dexterity.value) <= 2 ? modifier(dexterity.value) : 2);
            case 3:
              // Heavy armor
              return baseArmor ? baseArmor : acc + item.definition.armorClass;
            case 4:
              // Shield
              return acc + item.definition.armorClass;
            default:
              return acc;
          }
        }, 0);

      armorClass = armorClassOverride
        ? armorClassOverride
        : armorClass
        ? armorClass + armorBonus
        : 10 + modifier(dexterity.value) + armorBonus;

      console.log("AC", armorClass);

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
                    value: modSkills(
                      dexterity.value,
                      levels.total,
                      acrobatics.proficiency,
                      acrobatics.expertise,
                      acrobatics.halfProficiency
                    ),
                  },
                  animalHandling: {
                    ...animalHandling,
                    value: modSkills(
                      wisdom.value,
                      levels.total,
                      animalHandling.proficiency,
                      animalHandling.expertise,
                      animalHandling.halfProficiency
                    ),
                  },
                  arcana: {
                    ...arcana,
                    value: modSkills(
                      intelligence.value,
                      levels.total,
                      arcana.proficiency,
                      arcana.expertise,
                      arcana.halfProficiency
                    ),
                  },
                  athletics: {
                    ...athletics,
                    value: modSkills(
                      strength.value,
                      levels.total,
                      athletics.proficiency,
                      athletics.expertise,
                      athletics.halfProficiency
                    ),
                  },
                  deception: {
                    ...deception,
                    value: modSkills(
                      charisma.value,
                      levels.total,
                      deception.proficiency,
                      deception.expertise,
                      deception.halfProficiency
                    ),
                  },
                  history: {
                    ...history,
                    value: modSkills(
                      intelligence.value,
                      levels.total,
                      history.proficiency,
                      history.expertise,
                      history.halfProficiency
                    ),
                  },
                  insight: {
                    ...insight,
                    value: modSkills(
                      wisdom.value,
                      levels.total,
                      insight.proficiency,
                      insight.expertise,
                      insight.halfProficiency
                    ),
                  },
                  intimidation: {
                    ...intimidation,
                    value: modSkills(
                      charisma.value,
                      levels.total,
                      intimidation.proficiency,
                      intimidation.expertise,
                      intimidation.halfProficiency
                    ),
                  },
                  investigation: {
                    ...investigation,
                    value: modSkills(
                      intelligence.value,
                      levels.total,
                      investigation.proficiency,
                      investigation.expertise,
                      investigation.halfProficiency
                    ),
                  },
                  nature: {
                    ...nature,
                    value: modSkills(
                      intelligence.value,
                      levels.total,
                      nature.proficiency,
                      nature.expertise,
                      nature.halfProficiency
                    ),
                  },
                  perception: {
                    ...perception,
                    value: modSkills(
                      wisdom.value,
                      levels.total,
                      perception.proficiency,
                      perception.expertise,
                      perception.halfProficiency
                    ),
                  },
                  performance: {
                    ...performance,
                    value: modSkills(
                      charisma.value,
                      levels.total,
                      performance.proficiency,
                      performance.expertise,
                      performance.halfProficiency
                    ),
                  },
                  persuasion: {
                    ...persuasion,
                    value: modSkills(
                      charisma.value,
                      levels.total,
                      persuasion.proficiency,
                      persuasion.expertise,
                      persuasion.halfProficiency
                    ),
                  },
                  religion: {
                    ...religion,
                    value: modSkills(
                      intelligence.value,
                      levels.total,
                      religion.proficiency,
                      religion.expertise,
                      religion.halfProficiency
                    ),
                  },
                  sleightOfHand: {
                    ...sleightOfHand,
                    value: modSkills(
                      dexterity.value,
                      levels.total,
                      sleightOfHand.proficiency,
                      sleightOfHand.expertise,
                      sleightOfHand.halfProficiency
                    ),
                  },
                  stealth: {
                    ...stealth,
                    value: modSkills(
                      dexterity.value,
                      levels.total,
                      stealth.proficiency,
                      stealth.expertise,
                      stealth.halfProficiency
                    ),
                  },
                  survival: {
                    ...survival,
                    value: modSkills(
                      wisdom.value,
                      levels.total,
                      survival.proficiency,
                      survival.expertise,
                      survival.halfProficiency
                    ),
                  },
                },
                abilities: {
                  strength: {
                    ...strength,
                    modifier: modifier(strength.value),
                  },
                  dexterity: {
                    ...dexterity,
                    modifier: modifier(dexterity.value),
                  },
                  constitution: {
                    ...constitution,
                    modifier: modifier(constitution.value),
                  },
                  intelligence: {
                    ...intelligence,
                    modifier: modifier(intelligence.value),
                  },
                  wisdom: {
                    ...wisdom,
                    modifier: modifier(wisdom.value),
                  },
                  charisma: {
                    ...charisma,
                    modifier: modifier(charisma.value),
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

const isEquippedArmor = (armor) =>
  armor.definition.filterType === "Armor" && armor.equipped === true;

const isLightArmor = (armor) =>
  isEquippedArmor(armor) && armor.definition.armorTypeId === 1;

const isMediumArmor = (armor) =>
  isEquippedArmor(armor) && armor.definition.armorTypeId === 2;

const isHeavyArmor = (armor) =>
  isEquippedArmor(armor) && armor.definition.armorTypeId === 3;

const maxArmor = (armors, callback) => {
  return Math.max(
    ...armors
      .filter((armor) => callback(armor))
      .map((armor) => armor.definition.armorClass)
  );
};

const isAbilityOverride = (modifier, stat) =>
  isAbility(modifier) &&
  modifier.type === "set" &&
  modifier.subType.replace("-score", "") === stat;

const isAbilityBonus = (modifier, stat) =>
  isAbility(modifier) &&
  modifier.type === "bonus" &&
  modifier.subType.replace("-score", "") === stat;

const isAbilityChecksBonus = (modifier) =>
  modifier.type === "bonus" && modifier.subType === "ability-checks";

const isAbility = (modifier) =>
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

const modifier = (stat) => {
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
      ? modifier(skill) + 2 * compProf
      : modifier(skill) + compProf
    : halfProficiency
    ? modifier(skill) + Math.floor(compProf / 2)
    : modifier(skill);
};

const stringifyMod = (modifier) => {
  return modifier > 0 ? "+" + modifier : modifier;
};

const stringifyModStats = (modifier) => {
  return stringifyMod(modifier(modifier));
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
