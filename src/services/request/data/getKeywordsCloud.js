import moment from 'moment';
import requests from '../../requests';
import qs from 'qs';

const getKeywordsCloud = async (fid, startPublishedDay, endPublishedDay, keywordNumber) => {
  const params = {
    fid, startPublishedDay, endPublishedDay, keywordNumber,
  };
  const url = encodeURI(`${requests.getKeywordsCloud.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getKeywordsCloud.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default getKeywordsCloud;