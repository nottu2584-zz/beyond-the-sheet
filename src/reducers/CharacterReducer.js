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
      ] = characterAbilities.map((abilities, key) => {
        return {
          value:
            Object.keys(action.payload.data.modifiers)
              .map((index) =>
                action.payload.data.modifiers[index]
                  .filter((modifier) => isAbilityBonus(modifier, abilities))
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
      const statOverrides = characterAbilities.map((abilities) => {
        return Object.keys(action.payload.data.modifiers)
          .map((index) =>
            action.payload.data.modifiers[index]
              .filter((modifier) => isAbilitySet(modifier, abilities))
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
          isGlobalAbilityHalfProf(modifier)
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
      const baseArmorOverride = action.payload.data.characterValues
        .filter((value) => value.typeId === 4)
        .reduce((acc, value) => acc + value.value, 0);

      const equippedArmorClass =
        Math.max(
          ...[
            maxArmor(inventory, isLightArmor) + modifier(dexterity.value),
            maxArmor(inventory, isMediumArmor) + modifier(dexterity.value) <= 2
              ? modifier(dexterity.value)
              : 2,
            maxArmor(inventory, isHeavyArmor),
          ]
        ) + maxArmor(inventory, isShield);

      const equippedShield = maxArmor(inventory, isShield);

      const armorClass = armorClassOverride
        ? armorClassOverride
        : baseArmorOverride
        ? baseArmorOverride + armorBonus + equippedShield
        : equippedArmorClass
        ? equippedArmorClass + armorBonus
        : 10 + modifier(dexterity.value) + armorBonus + equippedShield;

      console.log("AC", armorClass.value);

      const currentExperience = action.payload.data.currentXp;
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
                  value: currentExperience,
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
                    value: modifierSkills(
                      dexterity.value,
                      levels.total,
                      acrobatics.proficiency,
                      acrobatics.expertise,
                      acrobatics.halfProficiency
                    ),
                  },
                  animalHandling: {
                    ...animalHandling,
                    value: modifierSkills(
                      wisdom.value,
                      levels.total,
                      animalHandling.proficiency,
                      animalHandling.expertise,
                      animalHandling.halfProficiency
                    ),
                  },
                  arcana: {
                    ...arcana,
                    value: modifierSkills(
                      intelligence.value,
                      levels.total,
                      arcana.proficiency,
                      arcana.expertise,
                      arcana.halfProficiency
                    ),
                  },
                  athletics: {
                    ...athletics,
                    value: modifierSkills(
                      strength.value,
                      levels.total,
                      athletics.proficiency,
                      athletics.expertise,
                      athletics.halfProficiency
                    ),
                  },
                  deception: {
                    ...deception,
                    value: modifierSkills(
                      charisma.value,
                      levels.total,
                      deception.proficiency,
                      deception.expertise,
                      deception.halfProficiency
                    ),
                  },
                  history: {
                    ...history,
                    value: modifierSkills(
                      intelligence.value,
                      levels.total,
                      history.proficiency,
                      history.expertise,
                      history.halfProficiency
                    ),
                  },
                  insight: {
                    ...insight,
                    value: modifierSkills(
                      wisdom.value,
                      levels.total,
                      insight.proficiency,
                      insight.expertise,
                      insight.halfProficiency
                    ),
                  },
                  intimidation: {
                    ...intimidation,
                    value: modifierSkills(
                      charisma.value,
                      levels.total,
                      intimidation.proficiency,
                      intimidation.expertise,
                      intimidation.halfProficiency
                    ),
                  },
                  investigation: {
                    ...investigation,
                    value: modifierSkills(
                      intelligence.value,
                      levels.total,
                      investigation.proficiency,
                      investigation.expertise,
                      investigation.halfProficiency
                    ),
                  },
                  nature: {
                    ...nature,
                    value: modifierSkills(
                      intelligence.value,
                      levels.total,
                      nature.proficiency,
                      nature.expertise,
                      nature.halfProficiency
                    ),
                  },
                  perception: {
                    ...perception,
                    value: modifierSkills(
                      wisdom.value,
                      levels.total,
                      perception.proficiency,
                      perception.expertise,
                      perception.halfProficiency
                    ),
                  },
                  performance: {
                    ...performance,
                    value: modifierSkills(
                      charisma.value,
                      levels.total,
                      performance.proficiency,
                      performance.expertise,
                      performance.halfProficiency
                    ),
                  },
                  persuasion: {
                    ...persuasion,
                    value: modifierSkills(
                      charisma.value,
                      levels.total,
                      persuasion.proficiency,
                      persuasion.expertise,
                      persuasion.halfProficiency
                    ),
                  },
                  religion: {
                    ...religion,
                    value: modifierSkills(
                      intelligence.value,
                      levels.total,
                      religion.proficiency,
                      religion.expertise,
                      religion.halfProficiency
                    ),
                  },
                  sleightOfHand: {
                    ...sleightOfHand,
                    value: modifierSkills(
                      dexterity.value,
                      levels.total,
                      sleightOfHand.proficiency,
                      sleightOfHand.expertise,
                      sleightOfHand.halfProficiency
                    ),
                  },
                  stealth: {
                    ...stealth,
                    value: modifierSkills(
                      dexterity.value,
                      levels.total,
                      stealth.proficiency,
                      stealth.expertise,
                      stealth.halfProficiency
                    ),
                  },
                  survival: {
                    ...survival,
                    value: modifierSkills(
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

const isArmor = (armor) => armor.definition.filterType === "Armor";

const isEquippedArmor = (armor) => isArmor(armor) && armor.equipped === true;

const isLightArmor = (armor) =>
  isEquippedArmor(armor) && armor.definition.armorTypeId === 1;

const isMediumArmor = (armor) =>
  isEquippedArmor(armor) && armor.definition.armorTypeId === 2;

const isHeavyArmor = (armor) =>
  isEquippedArmor(armor) && armor.definition.armorTypeId === 3;

const isShield = (armor) =>
  isEquippedArmor(armor) && armor.definition.armorTypeId === 4;

const maxArmor = (armors, callback) => {
  return Math.max(
    ...armors
      .filter((armor) => callback(armor))
      .map((armor) => armor.definition.armorClass)
  ) || 0;
};

const isBonus = (modifier) => modifier.type === "bonus";

const isSet = (modifier) => modifier.type === "set";

const isAbilityCheck = (modifier) =>
  isAbility(modifier) && isAbilityChecks(modifier);

const isAbilityChecks = (modifier) =>
  ~modifier.subType.indexOf("ability-checks");

const isSavingThrow = (modifier) =>
  isAbility(modifier) && isAbilityChecks(modifier);

const isSavingThrows = (modifier) => ~modifier.subType.indexOf("saving-throws");

const isInitiative = (modifier) => ~modifier.subType.indexOf("initiative");

const isGlobalAbilityBonus = (modifier) =>
  isBonus(modifier) && modifier.subType === "ability-checks";

const isGlobalAbilityHalfProf = (modifier) =>
  isHalfProf(modifier) && modifier.subType === "ability-checks";

const isHalfProf = (modifier) => ~modifier.type.indexOf("half-proficiency");

const isAbilityHalfProf = (modifier, ability) => {
  return (
    isAbility(modifier) &&
    isHalfProf(modifier) &&
    modifier.subType.indexOf(ability)
  );
};

const isSkillHalfProf = (modifier, skill) => {
  return (
    isSkill(modifier) && isHalfProf(modifier) && modifier.subType.indexOf(skill)
  );
};

const isAbility = (modifier) => {
  return (
    modifier.subType.indexOf("strength") ||
    modifier.subType.indexOf("dexterity") ||
    modifier.subType.indexOf("constitution") ||
    modifier.subType.indexOf("intelligence") ||
    modifier.subType.indexOf("wisdom") ||
    modifier.subType.indexOf("charisma")
  );
};

const isAbilitySet = (modifier, ability) => {
  return (
    isAbility(modifier) && isSet(modifier) && modifier.subType.indexOf(ability)
  );
};

const isAbilityBonus = (modifier, ability) => {
  return (
    isAbility(modifier) &&
    isBonus(modifier) &&
    modifier.subType.indexOf(ability)
  );
};

const isSkill = (modifier) => {
  return (
    modifier.subType.indexOf("acrobatics") ||
    modifier.subType.indexOf("animal-handling") ||
    modifier.subType.indexOf("arcana") ||
    modifier.subType.indexOf("athletics") ||
    modifier.subType.indexOf("deception") ||
    modifier.subType.indexOf("history") ||
    modifier.subType.indexOf("insight") ||
    modifier.subType.indexOf("intimidation") ||
    modifier.subType.indexOf("investigation") ||
    modifier.subType.indexOf("nature") ||
    modifier.subType.indexOf("perception") ||
    modifier.subType.indexOf("persuasion") ||
    modifier.subType.indexOf("performance") ||
    modifier.subType.indexOf("religion") ||
    modifier.subType.indexOf("sleight-of-hand") ||
    modifier.subType.indexOf("stealth") ||
    modifier.subType.indexOf("survival")
  );
};

const isSkillExpertise = (modifier, skill) => {
  return (
    isSkill(modifier) &&
    modifier.type === "expertise" &&
    modifier.subType.indexOf(skill)
  );
};

const isSkillProficiency = (modifier, skill) => {
  return (
    isSkill(modifier) &&
    modifier.type === "proficiency" &&
    modifier.subType.indexOf(skill)
  );
};

const modifier = (stat) => {
  return Math.floor((stat - 10) / 2);
};

const modifierSkills = (
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

export default CharacterReducer;
