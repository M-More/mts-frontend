import qs from 'qs';
import requests from '../../requests';

const getTraceTree = async (keyword, startPublishedDay, endPublishedDay) => {
  const params = {
    keyword,
    startPublishedDay,
    endPublishedDay,
  };
  const url = encodeURI(`${requests.getTraceTree.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getTraceTree.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default getTraceTree;
