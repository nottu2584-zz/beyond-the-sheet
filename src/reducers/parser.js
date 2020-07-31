const parser = (state = [], action) => {
  switch (action.type) {
    case "PARSE_CHARACTER":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    case "RESET":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

export default parser;
