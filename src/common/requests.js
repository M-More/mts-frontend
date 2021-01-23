const domain = 'http://localhost:8082';

const requests = {
  getInformation: { url: `${domain}/data/globalSearch/dataSearch`, method: 'GET' },
  getCflags: { url: `${domain}/data/globalSearch/cflagCount`, method: 'GET' },
  getFromTypes: { url: `${domain}/data/globalSearch/resourceCount`, method: 'GET' },
  getTrend: { url: `${domain}/data/globalSearch/amountTrendCount`, method: 'GET' },
};

export default requests;
