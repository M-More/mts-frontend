const domain = 'http://localhost:8082';

const requests = {
  getInfoResults: { url: `${domain}/data/globalSearch`, method: 'GET' },
  getCflagResults: { url: `${domain}/data/globalSearch/cflagCount`, method: 'GET' },
  getFromTypeResults: { url: `${domain}/data/globalSearch/resourceCount`, method: 'GET' },
  getDateTrendResults: { url: `${domain}/data/globalSearch/amountTrendCount`, method: 'GET' },
};

export default requests;
