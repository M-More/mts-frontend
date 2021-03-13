import requests from '../../requests';

const getProgrammes = async (username) => {
  const url = encodeURI(`${requests.getProgrammes.url}?username=${username}`);
  const response = await fetch(url, { method: requests.getOverallData.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = rawResult.data.map((item) => ({
    fid: item.fid.toString(),
    programmeName: item.fangAnname,
  }));
  return result;
};

export default getProgrammes;
