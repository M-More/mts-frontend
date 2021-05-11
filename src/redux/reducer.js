import { actionTypes } from './actions';
import { handleAuthChange } from './reducer/user';
import { handleProgrammeChange } from './reducer/programme';
import { handleOverallPathChange } from "./reducer/overall";

const initialState = {
  userName: undefined,
  userType: undefined,
  curProgramme: undefined,
  overallPath: '',
};

export default (prevState = initialState, actions) => {
  let newState;
  const { type, data } = actions;
  switch (type) {
    case actionTypes.ON_AUTH_CHANGE:
      newState = handleAuthChange(prevState, data);
      break;
    case actionTypes.ON_PROGRAMME_CHANGE:
      newState = handleProgrammeChange(prevState, data);
      break;
    case actionTypes.ON_OVERALL_PATH_CHANGE:
      newState = handleOverallPathChange(prevState, data);
      break;
    default:
      newState = { ...prevState };
      break;
  }
  return newState;
};
