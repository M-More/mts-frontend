import requests from "../requests";

const getInfo = async (params) => {
  const host = requests.getInfo.url;
  const uri = Object.keys(params).map((rule) => {
    if (rule === 'keyword' && params[rule] === '') return (`${rule}=`);
    if (params[rule] === null) return (`${rule}=`);
    return (`${rule}=${params[rule]}`);
  }).join('&');
  const url = encodeURI(`${host}?${uri}`);
  const response = await fetch(url, { method: requests.getInfo.method });
  const result = response.status === 200 ? await response.json() : {};
  result.data = result.dataContent;
  return result;
};

export default getInfo;
