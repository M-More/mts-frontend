import { actionTypes } from './actions';
import { handleAuthChange } from './reducer/user';

const initialState = {
  userName: undefined,
  userType: undefined,
};

export default (prevState = initialState, actions) => {
  let newState = { ...prevState };
  const { type, data } = actions;
  switch (type) {
    case actionTypes.TEST:
      newState = { ...prevState };
      break;
    case actionTypes.ON_AUTH_CHANGE:
      newState = handleAuthChange(data);
      break;
    default:
      break;
  }
  return newState;
};
