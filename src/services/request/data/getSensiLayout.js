import requests from '../../requests';
import qs from 'qs';

const getSensiLayout = async (keyword, startPublishedDay, endPublishedDay) => {
  const params = {
    keyword,
    startPublishedDay,
    endPublishedDay,
  };
  const url = encodeURI(`${requests.getSensiLayout.url}?${qs.stringify(params)}`);
  console.log(url);
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
