import { actionTypes } from './actions';

const initialState = {};

export default (prevState = initialState, actions) => {
  let newState = { ...prevState };
  const { type, data } = actions;
  switch (type) {
    case actionTypes.TEST:
      newState = { ...prevState };
      break;
    default:
      break;
  }
  return newState;
};
