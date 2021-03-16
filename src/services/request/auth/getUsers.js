import requests from '../../requests';

const getUsers = async () => {
  const url = encodeURI(`${requests.getUsers.url}`);
  const response = await fetch(url, { method: requests.getUsers.method });
  const result = response.status === 200 ? await response.json() : {};
  return result;
};

export default getUsers;
