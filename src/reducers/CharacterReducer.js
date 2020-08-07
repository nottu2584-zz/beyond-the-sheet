import { initialState } from "../components/App";

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
      const current = state.characters.map((character) => {
        return action.payload.data.id === character.data.id;
      });
      const [
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
      ] = action.payload.data.stats.map((stat, key) => {
        return action.payload.data.overrideStats[key].value
          ? // Stat override
            action.payload.data.overrideStats[key].value
          : // Stat base + bonus + all mods
            stat.value +
              action.payload.data.bonusStats[key].value +
              Object.keys(action.payload.data.modifiers)
                .map((index) => {
                  return action.payload.data.modifiers[index]
                    .filter((modifier) => {
                      return (
                        modifier.modifierTypeId === 1 &&
                        modifier.modifierSubTypeId === key + 2
                      );
                    })
                    .reduce((acc, b) => acc + b.value, 0);
                })
                .reduce((acc, b) => acc + b, 0);
      });
      return !current.includes(true)
        ? {
            ...state,
            characters: [
              ...state.characters,
              {
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

const isOverride = (modifier) =>
  modifier.Type === "set" && isStat(modifier)

const isBonus = (modifier) =>
  modifier.Type === "bonus" && isStat(modifier)

const isStat = (modifier) => modifier.SubType === "strength-score" ||
    modifier.SubType === "dexterity-score" ||
    modifier.SubType === "constitution-score" ||
    modifier.SubType === "intelligence-score" ||
    modifier.SubType === "wisdom-score" ||
    modifier.SubType === "charisma-score"

export default CharacterReducer;
