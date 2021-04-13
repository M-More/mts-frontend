const getProgramme = (url) => ({
  'data|10': [{
    'fangAnname': '@cword(3)',
    'fid|+1': 0,
    'matchType': 'titleOnly',
    'regionKeyword': '@cword(5)',
    'regionKeywordMatch|0-1': 0,
    'roleKeyword': '@cword(5)',
    'roleKeywordMatch|0-1': 0,
    'eventKeyword': '@cword(5)',
    'eventKeywordMatch|0-1': 0,
    'enableAlert': '@boolean',
  }],
});

export default getProgramme;
