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
      // Lazy store valid JSON
      return action.payload &&
        action.payload.success === true &&
        action.payload.data
        ? {
            ...state,
            data: action.payload,
          }
        : { ...state };
    case "PARSE":
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
              },
            ],
          }
        : { ...state };
    case "RESET":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
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

export default CharacterReducer;
