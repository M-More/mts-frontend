const domain = 'http://localhost:8082';

const requests = {
  getInfo: { url: `${domain}/data/globalSearch/dataSearch`, method: 'GET' },
  getCflags: { url: `${domain}/data/globalSearch/cflagCount`, method: 'GET' },
  getResources: { url: `${domain}/data/globalSearch/resourceCount`, method: 'GET' },
  getTrend: { url: `${domain}/data/globalSearch/amountTrendCount`, method: 'GET' },
  getTags: { url: `${domain}/data/getTags`, method: 'GET' },
  login: { url: `${domain}/User/login`, method: 'POST' },
};

export default requests;
