// eslint-disable-next-line import/prefer-default-export
export const handleAuthChange = (prevState) => {
  return {
    ...prevState,
    userName: sessionStorage.getItem('userName'),
    userType: sessionStorage.getItem('userType'),
  };
}
