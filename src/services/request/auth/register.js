import requests from '../../requests';

const register = async (userName, password, email, phone) => {
  const url = encodeURI(`${requests.register.url}`);
  const response = await fetch(url, {
    method: requests.register.method,
    body: {
      username: userName,
      password,
      email,
      phone,
    },
  });
  const result = response.status === 200 ? await response.json() : {};
  return result;
};

export default register;
