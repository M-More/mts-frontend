import Mock from 'mockjs';

const getInfo = (url) => ({
  'hitNumber': 55,
  'dataContent|10': [{
    'id': '@guid',
    'webpageUrl': '@url',
    'content': '@cparagraph(5)',
    'title': '@cword(10)',
    'publishedDay': '@date(yyyy-MM-dd hh-mm-ss)',
    'captureTime': '@date(yyyy-MM-dd hh-mm-ss)',
    'resource': '@cword(3)',
    'fromType': `${Mock.Random.integer(1, 7)}`,
    'cflag': `${Mock.Random.integer(1, 2)}`,
  }],
});

export default getInfo;
