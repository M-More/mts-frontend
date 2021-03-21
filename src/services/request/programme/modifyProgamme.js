import requests from '../../requests';

/**\
 * enableAlert: true
 eventKeywords: "市布复但局"
 eventMatch: "or"
 fid: "0"
 keywordMatch: "titleOnly"
 name: "改精位"
 regionKeywords: "只第与最不"
 regionMatch: "and"
 roleKeywords: "器可那战太"
 roleMatch: "or"
 userName: "龚秀兰"
 * @param rawData
 * @returns {Promise<{}>}
 */
const modifyProgramme = async (rawData) => {
  const data = {
    fid: rawData.fid,
    enableAlert: rawData.enableAlert,
    matchType: rawData.keywordMatch,
    regionKeyword: rawData.regionKeywords,
    eventKeyword: rawData.eventKeywords,
    roleKeyword: rawData.eventKeywords,
    roleKeywordMatch: rawData.roleMatch,
    eventKeywordMatch: rawData.eventMatch,
    regionKeywordMatch: rawData.regionMatch,
    username: rawData.userName,
    programmeName: rawData.name,
  };
  const url = encodeURI(`${requests.modifyProgramme.url}`);
  const response = await fetch(url, {
    method: requests.modifyProgramme.method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = {
    modifyProgramme: rawResult.saveFangAn,
  };
  return result;
};

export default modifyProgramme;
