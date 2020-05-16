const addsReducerDefaultState = [];

export default (state = addsReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_ADD_DATA":
      state = state.slice();
      state.push(action.item);

      return state;
    default:
      return state;
  }
};
