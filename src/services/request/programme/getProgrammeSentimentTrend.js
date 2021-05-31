import requests from '../../requests';
import moment from "moment";

const getProgrammeSentimentTrend = async (fid, startPublishedDay, endPublishedDay) => {
  const url = encodeURI(`${requests.getProgrammeSentimentTrend.url}?fid=${fid}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url, {
    method: requests.getProgrammeSentimentTrend.method,
  });
  const rawResult = response.status === 200 ? await response.json() : {};
  const emotionTrendLayout = {
    'yAxis': rawResult.timeRange ? rawResult.timeRange.map((str) => {
      const moments = str.split(' to ');
      const fromMoment = moment(moments[0]);
      const toMoment = moment(moments[1]);
      const avgTime = moment((fromMoment + toMoment) / 2).format('MM/DD');
      return avgTime
    }) : [],
    'xAxis': [
      { 'name': '积极', 'label': '积极', 'value': rawResult.happyTrend, color: 'pink' },
      { 'name': '愤怒', 'label': '愤怒', 'value': rawResult.angryTrend, color: 'red' },
      { 'name': '悲伤', 'label': '悲伤', 'value': rawResult.sadTrend, color: 'blue' },
      { 'name': '惊奇', 'label': '惊奇', 'value': rawResult.surpriseTrend, color: 'green' },
      { 'name': '恐惧', 'label': '恐惧', 'value': rawResult.fearTrend, color: 'yellow' },
      { 'name': '无情绪', 'label': '无情绪', 'value': rawResult.neutralTrend, color: 'darkgray' }],
  };
  return emotionTrendLayout;
};

export default getProgrammeSentimentTrend;