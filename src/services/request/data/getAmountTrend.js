import requests from '../../requests';
import qs from 'qs';
import moment from "moment";

const getAmountTrend = async (keyword, startPublishedDay, endPublishedDay) => {
  /* const params = {
    keyword,
    startPublishedDay,
    endPublishedDay,
  }; */
  const url = encodeURI(`${requests.getAmountTrend.url}?keyword=${keyword}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  console.log(url);
  const response = await fetch(url, { method: requests.getAmountTrend.method });
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
    yAxis: rawResult.timeRange ? rawResult.timeRange.map((str) => {
      const moments = str.split(' to ');
      const fromMoment = moment(moments[0]);
      const toMoment = moment(moments[1]);
      const avgTime = moment((fromMoment + toMoment) / 2).format('MM/DD');
      return avgTime
    }) : [],
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
    xAxis: rawResult.timeRange ? rawResult.timeRange.map((str) => {
      const moments = str.split(' to ');
      const fromMoment = moment(moments[0]);
      const toMoment = moment(moments[1]);
      const avgTime = moment((fromMoment + toMoment) / 2).format('MM/DD');
      return avgTime;
    }) : [],
    yAxis: rawResult.totalAmountTrend,
  };
  return [totalAmountTrend, sourceAmountTrend];
};

export default getAmountTrend;