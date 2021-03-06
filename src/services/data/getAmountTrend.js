import requests from '../requests';

const getAmountTrend = async (keyword, startPublishedDay, endPublishedDay) => {
  const params = {
    keyword,
    startPublishedDay,
    endPublishedDay,
  };
  const paramsUri = Object.keys(params).map((rule) => {
    if (rule === 'keyword' && params[rule] === '') return (`${rule}=`);
    if (params[rule] === null) return (`${rule}=`);
    return (`${rule}=${params[rule]}`);
  }).join('&');
  const url = encodeURI(`${requests.getAmountTrend.url}?${paramsUri}`);
  const response = await fetch(url, { method: requests.getInfo.method });
  const rawResult = response.status === 200 ? await response.json() : {};

  const options = [
    { label: '不限', value: null },
    { label: '网站', value: '1' },
    { label: '论坛', value: '2' },
    { label: '微博', value: '3' },
    { label: '微信', value: '4' },
    { label: '博客', value: '5' },
    { label: '外媒', value: '6' },
    { label: '新闻', value: '7' },
  ];
  const sourceAmountTrend = {
    yAxis: rawResult.timeRange.map((timestamp) => (timestamp.slice(0, 5))),
    xAxis: Object.keys(rawResult)
      .map((key) => ({
        key,
        id: parseInt(key.slice(-1), 10),
      }))
      .filter((item) => !isNaN(item.id))
      .map((item) => ({
        name: options[item.id].label,
        label: options[item.id].label,
        value: rawResult[item.key],
      })),
  };
  const totalAmountTrend = {
    xAxis: rawResult.timeRange.map((timestamp) => (timestamp.slice(0, 5))),
    yAxis: rawResult.totalAmountTrend,
  };
  return [totalAmountTrend, sourceAmountTrend];
};

export default getAmountTrend;