import requests from '../requests';

const getSensiLayout = async (keyword, startPublishedDay, endPublishedDay) => {
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
  const url = encodeURI(`${requests.getSensiLayout.url}?${paramsUri}`);
  const response = await fetch(url, { method: requests.getSensiLayout.method });
  const rawResult = response.status === 200 ? await response.json() : {};

  const options = [
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
      }));
  return sensiLayout;
};

export default getSensiLayout;
