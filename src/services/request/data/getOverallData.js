import moment from 'moment';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getOverallData = async (keyword, source, startPublishedDay, endPublishedDay, sensi, timeOrder, pageSize, pageId) => {
  const params = {
    keyword,
    startPublishedDay,
    endPublishedDay,
    timeOrder,
    pageSize,
    fromType: source,
    cflag: sensi,
    page: pageId,
  };
  const paramsUri = Object.keys(params).map((item) => {
    if (item === 'keyword' && params[item] === '') return (`${item}=`);
    if (params[item] === null) return (`${item}=`);
    return (`${item}=${params[item]}`);
  }).join('&');
  const url = encodeURI(`${requests.getOverallData.url}?${paramsUri}`);
  const response = await fetch(url, { method: requests.getOverallData.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = {
    dataSize: rawResult.hitNumber,
    data: rawResult.dataContent.map((item) => ({
      source: item.fromType,
      addr: item.resource,
      url: item.webpageUrl,
      sensi: item.cflag,
      publishedDay: moment(item.publishedDay).add(8, 'hours').format('YYYY-MM-DD HH:mm:ss'),
      ...item,
    })),
  };
  return result;
};

export default getOverallData;
