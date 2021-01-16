import moment from "moment";

const searchCriteria = [
  {
    name: 'cflag',
    label: '敏感度',
    defaultValue: null,
    options: [
      { label: '不限', value: null },
      { label: '敏感', value: 1 },
      { label: '非敏感', value: 2 },
    ],
  },
  {
    name: 'fromType',
    label: '来源',
    defaultValue: null,
    options: [
      { label: '不限', value: null },
      { label: '网站', value: 1 },
      { label: '论坛', value: 2 },
      { label: '微博', value: 3 },
      { label: '微信', value: 4 },
      { label: '博客', value: 5 },
      { label: '外媒', value: 6 },
      { label: '新闻', value: 7 },
    ],
  },
  {
    name: 'timeRange',
    label: '时间范围',
    defaultValue: null,
    options: [
      { label: '不限', value: null },
      { label: '今日', value: '今日' },
      { label: '一日', value: '一日' },
      { label: '两日', value: '两日' },
      { label: '三日', value: '三日' },
      { label: '七日', value: '七日' },
      { label: '十日', value: '十日' },
      { label: '自定义', value: '自定义' },
    ],
  },
  {
    name: 'timeOrder',
    label: '时间排序',
    defaultValue: 0,
    options: [
      { label: '时间顺序', value: 0 },
      { label: '时间逆序', value: 1 },
    ],
  },
];

export default searchCriteria;
