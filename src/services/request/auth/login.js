import requests from '../../requests';

const login = async (userName, password, role) => {
  const url = encodeURI(`${requests.login.url}`);
  console.log(requests.login);
  const response = await fetch(url, {
    method: requests.login.method,
    body: JSON.stringify({
      username: userName,
      password,
      role,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = response.status === 200 ? await response.json() : {};
  return result;
};

export default login;
