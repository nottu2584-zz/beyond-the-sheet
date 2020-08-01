import { initialState } from "../components/App";

const CharacterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET":
      // Lazy store valid JSON
      const data = JSON.parse(action.payload);
      return data && 'success' in data && data.success === true && 'data' in data ? {
        ...state,
        data: JSON.parse(action.payload),
      } : {
        ...state
      };
    case "PARSE":
      const current = state.characters.map((character) => {
        return action.payload.data.id === character.data.id
      });
      return !current.includes(true) ? {
        ...state,
        characters: [
          ...state.characters,
          action.payload
        ],
      } : {
        ...state
      };
    case "RESET":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

export default CharacterReducer;
