import moment from 'moment';
import requests from '../../requests';
import qs from 'qs';

const getKeywordsCloud = async (fid, startPublishedDay, endPublishedDay, keywordNumber) => {
  // const url = encodeURI(`${requests.getKeywordsCloud.url}?${qs.stringify(params)}`);
  const url = encodeURI(`${requests.getKeywordsCloud.url}?fid=7&startPublishedDay=&endPublishedDay=&keywordNumber=${encodeURI(keywordNumber)}`);
  console.log(url);
  const response = await fetch(url, { method: requests.getKeywordsCloud.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult);
  return rawResult instanceof Array ? rawResult : [];
};

export default getKeywordsCloud;
