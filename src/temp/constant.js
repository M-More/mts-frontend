import moment from 'moment';

export const generateRandomID = (length) => Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);

export const generateRandomCNString = (length) => unescape(new Array(length).fill(0).map(() => `%u${ Math.floor(Math.random() * (40870 - 19968) + 19968).toString(16) }`).join(''));

export const generateRandomDate = (hour) => moment(Date.now() - Math.floor(Math.random() * 1000 * 3600 * hour));

export const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const sensitiveLevels = [
  { label: '敏感', value: '敏感', color: '#ff0000' },
  { label: '非敏感', value: '非敏感', color: '#ffa500' },
];

export const sourceTypes = [
  { label: '网站', value: '网站' },
  { label: '论坛', value: '论坛' },
  { label: '微博', value: '微博' },
  { label: '微信', value: '微信' },
  { label: '博客', value: '博客' },
  { label: '新闻', value: '新闻' },
];

export const timeRangeOptions = [
  { label: '今日', value: '今日' },
  { label: '一日', value: '一日' },
  { label: '两日', value: '两日' },
  { label: '三日', value: '三日' },
  { label: '七日', value: '七日' },
  { label: '十日', value: '十日' },
  { label: '自定义', value: '自定义' },
];
export const timeOrderOptions = [
  { label: '时间升序', value: '时间升序' },
  { label: '时间降序', value: '时间降序' },
];
