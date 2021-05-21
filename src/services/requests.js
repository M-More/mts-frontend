const domain1 = 'http://192.168.0.19:8082';
const domain2 = 'http://localhost:3000/api';
const domain3 = 'http://localhost:8082';
const domain4 = 'http://202.120.40.69:28082';
const curDomain = domain4;

const requests = {
  getTopics: { url: `${curDomain}/data/getTags`, method: 'GET' },
  getOverallData: { url: `${curDomain}/data/globalSearch/dataSearch`, method: 'GET' },
  getProgrammeData: { url: `${curDomain}/data/singleSearch/findByFangAn2`, method: 'GET' },
  getSensiLayout: { url: `${curDomain}/data/globalSearch/cflagCount`, method: 'GET' },
  getSourceLayout: { url: `${curDomain}/data/globalSearch/resourceCount`, method: 'GET' },
  getAmountTrend: { url: `${curDomain}/data/globalSearch/amountTrendCount`, method: 'GET' },
  getRegionLayout: { url: `${curDomain}/data/globalSearch/areaCount`, method: 'GET' },
  register: { url: `${curDomain}/User/register`, method: 'POST' },
  getTraceTree: { url: `${curDomain}/data/weiboTrack`, method: 'GET' },
  modifyProgramme: { url: `${curDomain}/User/changeFangAn`, method: 'POST' },
  addProgramme: { url: `${curDomain}/User/saveFangAn`, method: 'POST' },
  delProgramme: { url: `${curDomain}/User/delFangAn`, method: 'GET' },
  getProgrammes: { url: `${curDomain}/User/findFangAn`, method: 'GET' },
  login: { url: `${curDomain}/User/login`, method: 'POST' },
  logout: { url: `${curDomain}/User/logout`, method: 'POST' },
  getUsers: { url: `${curDomain}/User/allUsers`, method: 'GET' },
  getKeywordsCloud: { url: `${curDomain}/data/keywordExtraction`, method: 'GET' },
  getSensitiveWord: { url: `${curDomain}/data/sensitiveWord`, method: 'POST' },
  getContentTag: { url: `${curDomain}/data/textClass2`, method: 'POST' },
  getProgrammeSensiLayout: { url: `${curDomain}/data/globalSearch/cflagCount2`, method: 'GET' },
  getProgrammeSourceLayout: { url: `${curDomain}/data/globalSearch/resourceCount2`, method: 'GET' },
  getProgrammeAmountTrend: { url: `${curDomain}/data/globalSearch/amountTrendCount2`, method: 'GET' },
  getProgrammeRegionLayout: { url: `${curDomain}/data/globalSearch/areaCount2`, method: 'GET' },
  getProgrammeOrigins: { url: `${curDomain}/User/findAllUrl`, method: 'GET' },
  addProgrammeOrigin: { url: `${curDomain}/User/addUrl`, method: 'POST' },
  delProgrammeOrigin: { url: `${curDomain}/User/delUrl`, method: 'GET' },
  getWeiboUserData: { url: `${domain3}/data/globalSearch/searchByUser`, method: 'GET' },
  getEventTree: { url: `${curDomain}/data/getEventTree`, method: 'GET' },
  getProgrammeSentimentLayout: { url: `${curDomain}/data/sentimentCount`, method: 'POST' },
  getProgrammeSentimentTrend: { url: `${curDomain}/data/sentimentTrendCount`, method: 'POST' }
};

export default requests;
