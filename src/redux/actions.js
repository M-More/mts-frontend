export const actionTypes = {
  TEST: 'TEST',
};

export const actionCreator = {
  test: (data) => ({ type: actionTypes.TEST, data }),
};
