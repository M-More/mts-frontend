import requests from '../../requests';

const getContentTag = async (contents, pageId) => {
  // const url = encodeURI(`${requests.getKeywordsCloud.url}?${qs.stringify(params)}`);
  const url = encodeURI(requests.getContentTag.url);
  const response = await fetch(url, { method: requests.getContentTag.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return {
    result: rawResult,
    pageId,
  };
};

export default getContentTag;
