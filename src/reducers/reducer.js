import { initialState } from "../components/App";

const characterAbilities = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

const characterSavingThrows = [
  "strength-saving-throws",
  "dexterity-saving-throws",
  "constitution-saving-throws",
  "intelligence-saving-throws",
  "wisdom-saving-throws",
  "charisma-saving-throws",
];

const characterSkills = [
  "acrobatics",
  "animal-handling",
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
  "sleight-of-hand",
  "stealth",
  "survival",
];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ABILITIES":
    case "UPDATE_SKILLS":
    case "UPDATE":
      const inventory = action.payload.data.inventory;
      const modifiers = action.payload.data.modifiers;
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
      ] = characterAbilities.map((ability, key) => {
        return {
          value:
            Object.keys(modifiers)
              .map((index) =>
                modifiers[index]
                  .filter((modifier) => isAbilityBonus(modifier, ability))
                  .reduce(
                    (acc, modifier) =>
                      index === "item"
                        ? isEquippedOrAttuned(modifier, inventory)
                          ? acc + modifier.value
                          : acc
                        : acc + modifier.value,
                    0
                  )
              )
              .reduce((acc, modifier) => acc + modifier, 0) +
            action.payload.data.stats[key].value +
            action.payload.data.bonusStats[key].value,
        };
      });

      /**
       * Sets character abilities overrides when necessary, keeping the biggest value
       */
      const statOverrides = characterAbilities.map((ability) => {
        return {
          value: Object.keys(modifiers)
            .map((index) =>
              modifiers[index]
                .filter((modifier) => isAbilitySet(modifier, ability))
                .reduce(
                  (acc, modifier) =>
                    index === "item"
                      ? isEquippedOrAttuned(modifier, inventory)
                        ? Math.max(acc, modifier.value)
                        : acc
                      : Math.max(acc, modifier.value),
                  0
                )
            )
            .reduce((acc, modifier) => Math.max(acc, modifier), 0),
        };
      });

      //[{value:1}, {value:2}, {value:3}]

      strength.value = statOverrides[0].value || strength.value;
      dexterity.value = statOverrides[1].value || dexterity.value;
      constitution.value = statOverrides[2].value || constitution.value;
      intelligence.value = statOverrides[3].value || intelligence.value;
      wisdom.value = statOverrides[4].value || wisdom.value;
      charisma.value = statOverrides[5].value || charisma.value;

      /**
       * Checks for half proficiency on ability checks (Jack of All Trades, etc.)
       */

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
       * Sets the character saving throws array
       */

      const [
        strengthSavingThrow,
        dexteritySavingThrow,
        constitutionSavingThrow,
        intelligenceSavingThrow,
        wisdomSavingThrow,
        charismaSavingThrow,
      ] = characterSavingThrows.map((savingThrow) => {
        return {
          proficiency: Object.keys(modifiers).some((index) =>
            modifiers[index].some((modifier) =>
              isSavingThrowProficiency(modifier, savingThrow)
            )
          ),
          bonus: Object.keys(modifiers).reduce(
            (acc, index) =>
              acc +
              modifiers[index].reduce(
                (acc, modifier) =>
                  isBonus(modifier) && isSavingThrows(modifier)
                    ? index === "item"
                      ? isEquippedOrAttuned(modifier, inventory)
                        ? acc + modifier.value
                        : acc
                      : acc + modifier.value
                    : acc,
                0
              ),
            0
          ),
        };
      });

      const initiative = {
        halfProficiency: Object.keys(modifiers).some((index) =>
          modifiers[index].some(
            (modifier) =>
              isHalfProf(modifier) && modifier.subType === "initiative"
          )
        ),
        bonus: Object.keys(modifiers).reduce(
          (acc, index) =>
            acc +
            modifiers[index].reduce(
              (acc, modifier) =>
                isBonus(modifier) && isAbilityChecks(modifier)
                  ? index === "item"
                    ? isEquippedOrAttuned(modifier, inventory)
                      ? acc + modifier.value
                      : acc
                    : acc + modifier.value
                  : acc,
              0
            ),
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
          expertise: Object.keys(modifiers).some((index) =>
            modifiers[index].some((modifier) =>
              isSkillExpertise(modifier, skill)
            )
          ),
          proficiency: Object.keys(modifiers).some((index) =>
            modifiers[index].some((modifier) =>
              isSkillProficiency(modifier, skill)
            )
          ),
          halfProficiency: Object.keys(modifiers).some((index) =>
            modifiers[index].some(
              (modifier) =>
                isHalfProf(modifier) && modifier.subType === "ability-checks"
            )
          ),
          bonus: Object.keys(modifiers).reduce(
            (acc, index) =>
              acc +
              modifiers[index].reduce(
                (acc, modifier) =>
                  isBonus(modifier) && isAbilityChecks(modifier)
                    ? index === "item"
                      ? isEquippedOrAttuned(modifier, inventory)
                        ? acc + modifier.value
                        : acc
                      : acc + modifier.value
                    : acc,
                0
              ),
            0
          ),
        };
      });

      const hitPointsModifier = Object.keys(modifiers).reduce(
        (acc, index) =>
          acc +
          modifiers[index].reduce(
            (acc, modifier) =>
              modifier.subType.includes("hit-points") && isBonus(modifier)
                ? modifier.subType.includes("per-level")
                  ? acc + modifier.value * levels.total
                  : acc + modifier.value
                : acc,
            0
          ),
        0
      );

      const maxHitPoints =
        action.payload.data.overrideHitPoints ||
        action.payload.data.baseHitPoints +
          action.payload.data.bonusHitPoints +
          hitPointsModifier +
          modifier(constitution.value) * levels.total;

      const hitPoints = {
        base: action.payload.data.baseHitPoints,
        // bonuses: [
        //   {
        //     description: "Tough",
        //     value: 10,
        //   }
        // ],
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
       * Additional armor bonuses from items
       */

      const armoredItemBonus = itemBonus(modifiers, inventory, "armor-class");

      const unarmoredItemBonus = itemBonus(
        modifiers,
        inventory,
        "unarmored-armor-class"
      );

      const unarmoredArmor = itemSet(
        modifiers,
        inventory,
        "unarmored-armor-class"
      );

      /**
       * Base armor overrides
       */
      const baseArmorOverride = action.payload.data.characterValues
        .filter((value) => value.typeId === 4)
        .reduce((acc, value) => acc + value.value, 0);

      const equippedArmorClass = Math.max(
        ...[
          maxArmor(inventory, isLightArmor, modifier(dexterity.value)),
          maxArmor(
            inventory,
            isMediumArmor,
            isMediumArmorMaster(modifiers)
              ? modifier(dexterity.value) <= 3
                ? modifier(dexterity.value)
                : 3
              : modifier(dexterity.value) <= 2
              ? modifier(dexterity.value)
              : 2
          ),
          maxArmor(inventory, isHeavyArmor),
        ]
      );

      const equippedShield = maxArmor(inventory, isShield);

      const armorClass = armorClassOverride
        ? armorClassOverride
        : baseArmorOverride
        ? baseArmorOverride +
          armorBonus +
          equippedShield +
          armoredItemBonus +
          unarmoredItemBonus
        : equippedArmorClass
        ? equippedArmorClass + armorBonus + equippedShield + armoredItemBonus
        : 10 +
          modifier(dexterity.value) +
          unarmoredArmor +
          armorBonus +
          equippedShield +
          armoredItemBonus +
          unarmoredItemBonus;

      return !current.includes(true)
        ? {
            ...state,
            characters: [
              ...state.characters,
              {
                ...action.payload,
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
                armorClass: armorClass,
                conditions: action.payload.data.conditions,
                experience: {
                  value: action.payload.data.currentXp,
                },
                hitPoints: {
                  ...hitPoints,
                },
                initiative: {
                  ...initiative,
                  value:
                    modifierSkills(
                      dexterity.value,
                      levels.total,
                      false,
                      false,
                      initiative.halfProficiency
                    ) + initiative.bonus,
                },
                savingThrows: {
                  strength: {
                    ...strengthSavingThrow,
                    value:
                      modifierSavingThrows(
                        strength.value,
                        levels.total,
                        strengthSavingThrow.proficiency
                      ) + strengthSavingThrow.bonus,
                  },
                  dexterity: {
                    ...dexteritySavingThrow,
                    value:
                      modifierSavingThrows(
                        dexterity.value,
                        levels.total,
                        dexteritySavingThrow.proficiency
                      ) + dexteritySavingThrow.bonus,
                  },
                  constitution: {
                    ...constitutionSavingThrow,
                    value:
                      modifierSavingThrows(
                        constitution.value,
                        levels.total,
                        constitutionSavingThrow.proficiency
                      ) + constitutionSavingThrow.bonus,
                  },
                  intelligence: {
                    ...intelligenceSavingThrow,
                    value:
                      modifierSavingThrows(
                        intelligence.value,
                        levels.total,
                        intelligenceSavingThrow.proficiency
                      ) + intelligenceSavingThrow.bonus,
                  },
                  wisdom: {
                    ...wisdomSavingThrow,
                    value:
                      modifierSavingThrows(
                        wisdom.value,
                        levels.total,
                        wisdomSavingThrow.proficiency
                      ) + wisdomSavingThrow.bonus,
                  },
                  charisma: {
                    ...charismaSavingThrow,
                    value:
                      modifierSavingThrows(
                        charisma.value,
                        levels.total,
                        charismaSavingThrow.proficiency
                      ) + charismaSavingThrow.bonus,
                  },
                },
                skills: {
                  acrobatics: {
                    ...acrobatics,
                    value:
                      modifierSkills(
                        dexterity.value,
                        levels.total,
                        acrobatics.proficiency,
                        acrobatics.expertise,
                        acrobatics.halfProficiency
                      ) + acrobatics.bonus,
                  },
                  animalHandling: {
                    ...animalHandling,
                    value:
                      modifierSkills(
                        wisdom.value,
                        levels.total,
                        animalHandling.proficiency,
                        animalHandling.expertise,
                        animalHandling.halfProficiency
                      ) + animalHandling.bonus,
                  },
                  arcana: {
                    ...arcana,
                    value:
                      modifierSkills(
                        intelligence.value,
                        levels.total,
                        arcana.proficiency,
                        arcana.expertise,
                        arcana.halfProficiency
                      ) + arcana.bonus,
                  },
                  athletics: {
                    ...athletics,
                    value:
                      modifierSkills(
                        strength.value,
                        levels.total,
                        athletics.proficiency,
                        athletics.expertise,
                        athletics.halfProficiency
                      ) + athletics.bonus,
                  },
                  deception: {
                    ...deception,
                    value:
                      modifierSkills(
                        charisma.value,
                        levels.total,
                        deception.proficiency,
                        deception.expertise,
                        deception.halfProficiency
                      ) + deception.bonus,
                  },
                  history: {
                    ...history,
                    value:
                      modifierSkills(
                        intelligence.value,
                        levels.total,
                        history.proficiency,
                        history.expertise,
                        history.halfProficiency
                      ) + history.bonus,
                  },
                  insight: {
                    ...insight,
                    value:
                      modifierSkills(
                        wisdom.value,
                        levels.total,
                        insight.proficiency,
                        insight.expertise,
                        insight.halfProficiency
                      ) + insight.bonus,
                  },
                  intimidation: {
                    ...intimidation,
                    value:
                      modifierSkills(
                        charisma.value,
                        levels.total,
                        intimidation.proficiency,
                        intimidation.expertise,
                        intimidation.halfProficiency
                      ) + intimidation.bonus,
                  },
                  investigation: {
                    ...investigation,
                    value:
                      modifierSkills(
                        intelligence.value,
                        levels.total,
                        investigation.proficiency,
                        investigation.expertise,
                        investigation.halfProficiency
                      ) + investigation.bonus,
                  },
                  nature: {
                    ...nature,
                    value:
                      modifierSkills(
                        intelligence.value,
                        levels.total,
                        nature.proficiency,
                        nature.expertise,
                        nature.halfProficiency
                      ) + nature.bonus,
                  },
                  perception: {
                    ...perception,
                    value:
                      modifierSkills(
                        wisdom.value,
                        levels.total,
                        perception.proficiency,
                        perception.expertise,
                        perception.halfProficiency
                      ) + perception.bonus,
                  },
                  performance: {
                    ...performance,
                    value:
                      modifierSkills(
                        charisma.value,
                        levels.total,
                        performance.proficiency,
                        performance.expertise,
                        performance.halfProficiency
                      ) + performance.bonus,
                  },
                  persuasion: {
                    ...persuasion,
                    value:
                      modifierSkills(
                        charisma.value,
                        levels.total,
                        persuasion.proficiency,
                        persuasion.expertise,
                        persuasion.halfProficiency
                      ) + religion.bonus,
                  },
                  religion: {
                    ...religion,
                    value:
                      modifierSkills(
                        intelligence.value,
                        levels.total,
                        religion.proficiency,
                        religion.expertise,
                        religion.halfProficiency
                      ) + religion.bonus,
                  },
                  sleightOfHand: {
                    ...sleightOfHand,
                    value:
                      modifierSkills(
                        dexterity.value,
                        levels.total,
                        sleightOfHand.proficiency,
                        sleightOfHand.expertise,
                        sleightOfHand.halfProficiency
                      ) + sleightOfHand.bonus,
                  },
                  stealth: {
                    ...stealth,
                    value:
                      modifierSkills(
                        dexterity.value,
                        levels.total,
                        stealth.proficiency,
                        stealth.expertise,
                        stealth.halfProficiency
                      ) + stealth.bonus,
                  },
                  survival: {
                    ...survival,
                    value:
                      modifierSkills(
                        wisdom.value,
                        levels.total,
                        survival.proficiency,
                        survival.expertise,
                        survival.halfProficiency
                      ) + survival.bonus,
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

const itemBonus = (modifiers, inventory, type) =>
  modifiers.item.reduce(
    (acc, item) =>
      isBonus(item) &&
      item.subType === type &&
      isEquippedOrAttuned(item, inventory)
        ? Math.max(acc, item.value)
        : acc,
    0
  );

const itemSet = (modifiers, inventory, type) =>
  modifiers.item.reduce(
    (acc, item) =>
      isSet(item) &&
      item.subType === type &&
      isEquippedOrAttuned(item, inventory)
        ? Math.max(acc, item.value)
        : acc,
    0
  );

const isEquipped = (itemId, items) =>
  items.some((item) => itemId === item.definition.id && item.equipped === true);

const isAttuned = (itemId, items) =>
  items.some(
    (item) => itemId === item.definition.id && item.isAttuned === true
  );

const isEquippedOrAttuned = (item, inventory) =>
  isEquipped(item.componentId, inventory)
    ? item.requiresAttunement
      ? isAttuned(item.componentId, inventory)
      : true
    : false;

const isEquippedItem = (item) => item.equipped === true;

const isEquippedArmor = (armor) => isArmor(armor) && isEquippedItem(armor);

const isLightArmor = (armor) =>
  isEquippedArmor(armor) && armor.definition.armorTypeId === 1;

const isMediumArmor = (armor) =>
  isEquippedArmor(armor) && armor.definition.armorTypeId === 2;

const isHeavyArmor = (armor) =>
  isEquippedArmor(armor) && armor.definition.armorTypeId === 3;

const isShield = (armor) =>
  isEquippedArmor(armor) && armor.definition.armorTypeId === 4;

const maxArmor = (armors, callback, modifier = 0) => {
  const result = Math.max(
    ...armors
      .filter((armor) => callback(armor))
      .map((armor) => armor.definition.armorClass)
  );
  return isFinite(result) ? result + modifier : 0;
};

const isBonus = (modifier) => modifier.type === "bonus";

const isSet = (modifier) => modifier.type === "set";

const isAbilityCheck = (modifier) =>
  isAbility(modifier) && isAbilityChecks(modifier);

const isAbilityChecks = (modifier) =>
  modifier.subType.includes("ability-checks");

const isSavingThrow = (modifier) =>
  isAbility(modifier) && isAbilityChecks(modifier);

const isSavingThrows = (modifier) => modifier.subType.includes("saving-throws");

const isInitiative = (modifier) => ~modifier.subType.includes("initiative");

const isGlobalAbilityBonus = (modifier) =>
  isBonus(modifier) && modifier.subType === "ability-checks";

const isHalfProf = (modifier) => ~modifier.type.includes("half-proficiency");

const isMediumArmorMaster = (modifiers) =>
  modifiers.feat.some(
    (modifier) => modifier.subType === "ac-max-dex-armored-modifier"
  );

const isAbilityHalfProf = (modifier, ability) => {
  return (
    isAbility(modifier) &&
    isHalfProf(modifier) &&
    modifier.subType.includes(ability)
  );
};

const isSkillHalfProf = (modifier, skill) => {
  return (
    isSkill(modifier) &&
    isHalfProf(modifier) &&
    modifier.subType.includes(skill)
  );
};

const isAbility = (modifier) => {
  return (
    modifier.subType.includes("strength") ||
    modifier.subType.includes("dexterity") ||
    modifier.subType.includes("constitution") ||
    modifier.subType.includes("intelligence") ||
    modifier.subType.includes("wisdom") ||
    modifier.subType.includes("charisma")
  );
};

const isAbilitySet = (modifier, ability) => {
  return (
    isAbility(modifier) && isSet(modifier) && modifier.subType.includes(ability)
  );
};

const isAbilityBonus = (modifier, ability) => {
  return (
    isAbility(modifier) &&
    isBonus(modifier) &&
    modifier.subType.includes(ability)
  );
};

const isSkill = (modifier) => {
  return (
    modifier.subType.includes("acrobatics") ||
    modifier.subType.includes("animal-handling") ||
    modifier.subType.includes("arcana") ||
    modifier.subType.includes("athletics") ||
    modifier.subType.includes("deception") ||
    modifier.subType.includes("history") ||
    modifier.subType.includes("insight") ||
    modifier.subType.includes("intimidation") ||
    modifier.subType.includes("investigation") ||
    modifier.subType.includes("nature") ||
    modifier.subType.includes("perception") ||
    modifier.subType.includes("persuasion") ||
    modifier.subType.includes("performance") ||
    modifier.subType.includes("religion") ||
    modifier.subType.includes("sleight-of-hand") ||
    modifier.subType.includes("stealth") ||
    modifier.subType.includes("survival")
  );
};

const isSkillExpertise = (modifier, skill) => {
  return (
    isSkill(modifier) &&
    modifier.type === "expertise" &&
    modifier.subType.includes(skill)
  );
};

const isSkillProficiency = (modifier, skill) => {
  return (
    isSkill(modifier) &&
    modifier.type === "proficiency" &&
    modifier.subType.includes(skill)
  );
};

const isSavingThrowProficiency = (modifier, savingThrow) =>
  modifier.type === "proficiency" && modifier.subType === savingThrow;

const modifier = (ability) => {
  return Math.floor((ability - 10) / 2);
};

const proficiency = (level) => Math.ceil(level / 4) + 1;

const modifierSkills = (
  ability,
  levels,
  hasProficiency = false,
  hasExpertise = false,
  halfProficiency = false
) => {
  return hasProficiency
    ? hasExpertise
      ? modifier(ability) + 2 * proficiency(levels)
      : modifier(ability) + proficiency(levels)
    : halfProficiency
    ? modifier(ability) + Math.floor(proficiency(levels) / 2)
    : modifier(ability);
};

const modifierSavingThrows = (ability, levels, hasProficiency = false) =>
  hasProficiency ? modifier(ability) + proficiency(levels) : modifier(ability);

export default reducer;
