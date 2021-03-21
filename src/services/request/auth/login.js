import requests from '../../requests';

const login = async (userName, password, role) => {
  const url = encodeURI(`${requests.login.url}`);
  const response = await fetch(url, {
    method: requests.login.method,
    body: {
      username: userName,
      password,
      role,
    },
  });
  const result = response.status === 200 ? await response.json() : {};
  return result;
};

export default login;