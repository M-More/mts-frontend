const domain1 = 'http://localhost:8082';
const domain2 = 'http://localhost:3000/api';
const curDomain = domain2;

const requests = {
  getTopics: { url: `${curDomain}/data/getTags`, method: 'GET' },
  getOverallData: { url: `${curDomain}/data/globalSearch/dataSearch`, method: 'GET' },
  getSensiLayout: { url: `${curDomain}/data/globalSearch/cflagCount`, method: 'GET' },
  getSourceLayout: { url: `${curDomain}/data/globalSearch/resourceCount`, method: 'GET' },
  getAmountTrend: { url: `${curDomain}/data/globalSearch/amountTrendCount`, method: 'GET' },
  getRegionLayout: { url: `${curDomain}/data/globalSearch/areaCount`, method: 'GET' },
  getProgrammes: { url: `${curDomain}/User/findFangAn`, method: 'GET' },
  addProgramme: { url: `${curDomain}/User/addFangAn`, method: 'POST' },
  delProgramme: { url: `${curDomain}/User/delFangAn`, method: 'POST' },
  editProgramme: { url: `${curDomain}/User/editFangAn`, method: 'POST' },
  getProgrammeData: { url: `${curDomain}/data/singleSearch/findByFangAn`, method: 'GET' },
  login: { url: `${curDomain}/User/login`, method: 'POST' },
  logout: { url: `${curDomain}/User/logout`, method: 'POST' },
  register: { url: `${curDomain}/User/register`, method: 'POST' },
};

export default requests;
