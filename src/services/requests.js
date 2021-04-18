const domain1 = 'http://localhost:8082';
const domain2 = 'http://localhost:3000/api';
const curDomain = domain1;

const requests = {
  getTopics: { url: `${curDomain}/data/getTags`, method: 'GET' },
  getOverallData: { url: `${curDomain}/data/globalSearch/dataSearch`, method: 'GET' },
  getProgrammeData: { url: `${curDomain}/data/singleSearch/findByFangAn`, method: 'GET' },
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
};

export default requests;
