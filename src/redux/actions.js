export const actionTypes = {
  TEST: Symbol('test'),
  ON_AUTH_CHANGE: Symbol('on_auth_change'),
  ON_PROGRAMME_CHANGE: Symbol('on_programme_change'),
};

export const actions = {
  test: (data) => ({ type: actionTypes.TEST, data }),
  onAuthChange: (data) => ({ type: actionTypes.ON_AUTH_CHANGE, data }),
  onProgrammeChange: (data) => ({ type: actionTypes.ON_PROGRAMME_CHANGE, data }),
};
