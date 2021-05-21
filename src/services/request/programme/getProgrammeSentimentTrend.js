import requests from '../../requests';
import moment from "moment";

const getProgrammeSentimentTrend = async (fid, startPublishedDay, endPublishedDay) => {
  const url = encodeURI(`${requests.getProgrammeSentimentTrend.url}?fid=${fid}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url, {
    method: requests.getProgrammeSentimentTrend.method,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult, url);
  const emotionTrendLayout = {
    'yAxis': rawResult.timeRange,
    'xAxis': [
      { 'name': '积极', 'label': '积极', 'value': rawResult.happyTrend },
      { 'name': '愤怒', 'label': '愤怒', 'value': rawResult.angryTrend },
      { 'name': '悲伤', 'label': '悲伤', 'value': rawResult.sadTrend },
      { 'name': '恐惧', 'label': '恐惧', 'value': rawResult.fearTrend },
      { 'name': '惊奇', 'label': '惊奇', 'value': rawResult.surpriseTrend },
      { 'name': '无情绪', 'label': '无情绪', 'value': rawResult.neutralTrend }],
  };
  return emotionTrendLayout;
};

export default getProgrammeSentimentTrend;