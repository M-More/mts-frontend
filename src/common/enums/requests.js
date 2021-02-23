const domain1 = 'http://localhost:8082';
const domain2 = 'http://localhost:3000/api';
const proxyDomain = domain2;

const requests = {
  getInfo: { url: `${proxyDomain}/data/globalSearch/dataSearch`, method: 'GET' },
  getCflags: { url: `${proxyDomain}/data/globalSearch/cflagCount`, method: 'GET' },
  getResources: { url: `${proxyDomain}/data/globalSearch/resourceCount`, method: 'GET' },
  getTrend: { url: `${proxyDomain}/data/globalSearch/amountTrendCount`, method: 'GET' },
  getTags: { url: `${proxyDomain}/data/getTags`, method: 'GET' },
  login: { url: `${proxyDomain}/User/login`, method: 'POST' },
};

export default requests;
