export default (state, action) => {
  switch (action.type) {
    case VALUE.type:
      return action.payload;
    case TEST.type:
      return console.log(action.payload);
    default:
      return state;
  }
};

export const TEST = {
  type: 'test'
};

export const VALUE = {
  type: 'value'
};
