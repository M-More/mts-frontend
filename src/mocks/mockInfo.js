import Mock from 'mockjs';

const mockInfo = (url) => ({
  'hitNumber': 55,
  'dataContent|10': [{
    'id': '@guid',
    'webpageUrl': '@url',
    'content': '@cparagraph(5)',
    'title': '@csentence(10)',
    'publishedDay': '@date(yyyy-MM-dd hh-mm-ss)',
    'captureTime': '@date(yyyy-MM-dd hh-mm-ss)',
    'fromType|1': ['微博', '博客', '论坛'],
    'cflag|1': [1, 2],
  }],
});

export default mockInfo;
