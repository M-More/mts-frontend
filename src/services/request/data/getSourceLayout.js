import requests from '../../requests';

const getSourceLayout = async (keyword, startPublishedDay, endPublishedDay) => {
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
  const url = encodeURI(`${requests.getSourceLayout.url}?${paramsUri}`);
  const response = await fetch(url, { method: requests.getSourceLayout.method });
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
  const sourceLayout =
    Object.keys(rawResult)
      .map((id) => ({
        name: options[id].label,
        label: options[id].label,
        value: rawResult[id],
      }));
  return sourceLayout;
};

export default getSourceLayout;
