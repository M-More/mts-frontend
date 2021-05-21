import qs from 'qs';
import requests from '../../requests';

const getProgrammeSentimentLayout = async (fid, startPublishedDay, endPublishedDay) => {
  const url = encodeURI(`${requests.getProgrammeSentimentLayout.url}?fid=${fid}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  console.log(url);
  const response = await fetch(url,
    {
      method: requests.getProgrammeSentimentLayout.method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult);
  /* const options = [
    { label: '不限', value: null },
    { label: '敏感', value: '1' },
    { label: '非敏感', value: '2' },
  ];
  const sensiLayout =
    Object.keys(rawResult)
      .map((id) => ({
        name: options[id].label,
        label: options[id].label,
        value: rawResult[id],
      })); */
  const sentimentLayout = [
    { name: '积极', label: '积极', value: rawResult.happy },
    { name: '愤怒', label: '愤怒', value: rawResult.angry },
    { name: '悲伤', label: '悲伤', value: rawResult.sad },
    { name: '恐惧', label: '恐惧', value: rawResult.fear },
    { name: '惊奇', label: '惊奇', value: rawResult.surprise },
    { name: '无情绪', label: '无情绪', value: rawResult.neutral },
  ];
  return sentimentLayout;
};

export default getProgrammeSentimentLayout;
