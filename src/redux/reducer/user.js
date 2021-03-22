// eslint-disable-next-line import/prefer-default-export
export const handleAuthChange = (prevState) => {
  console.log(prevState);
  return {
    ...prevState,
    userName: localStorage.getItem('userName'),
    userType: localStorage.getItem('userType'),
  };
};
