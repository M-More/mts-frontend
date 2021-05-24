import moment from 'moment';
import requests from '../../requests';
import qs from 'qs';

const getEventTree = async (fid, startPublishedDay, endPublishedDay) => {
  // const url = encodeURI(`${requests.getKeywordsCloud.url}?${qs.stringify(params)}`);
  const url = encodeURI(`${requests.getEventTree.url}?fid=${fid}&startPublishedDay=&endPublishedDay=`);
  const response = await fetch(url, { method: requests.getEventTree.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default getEventTree;
