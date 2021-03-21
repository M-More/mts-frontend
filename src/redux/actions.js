export const actionTypes = {
  TEST: Symbol('test'),
  ON_AUTH_CHANGE: Symbol('handle_auth_change'),
};

export const actions = {
  test: (data) => ({ type: actionTypes.TEST, data }),
  onAuthChange: (data) => ({ type: actionTypes.ON_AUTH_CHANGE, data }),
};
