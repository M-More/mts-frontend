import lodash from 'lodash-uuid';
import {
  generateRandomCNString,
  generateRandomID,
  generateRandomDate,
  random,
  sensitiveLevels,
  sourceTypes
} from '../../constant';

const menu = [
  {
    label: '默认',
    value: '默认',
    subMenu: [
      { label: '新冠病毒', value: '新冠病毒' },
      { label: 'DD', value: 'DD' },
      { label: 'ETC', value: 'ETC' },
      { label: '政策法规', value: '政策法规' },
      { label: '专利', value: '专利' },
    ]
  },
  {
    label: 'CETC',
    value: 'CETC',
    subMenu: [
      { label: '镇城远古', value: '镇城远古' },
      { label: '千户测试', value: '千户测试' },
      { label: '理想公司', value: '理想公司' },
      { label: '政策法规', value: '政策法规' },
      { label: '区块链', value: '区块链' },
    ]
  }
];

const payload = {
  menu,
  results: menu.map((item) => ({
    label: item.label,
    value: item.value,
    subMenu: item.subMenu.map((subItem) => ({
      label: subItem.label,
      value: subItem.value,
      articles: new Array(10).fill(0).map(() => ({
        id: lodash.uuid(),
        title: generateRandomCNString(10),
        source: sourceTypes[random(0, sourceTypes.length)],
        link: `https://www.invalid.${generateRandomID(10)}.com`,
        timestamp: generateRandomDate(24 * 10),
        content: generateRandomCNString(Math.floor(Math.random() * 200 + 100)),
        attribute: sensitiveLevels[random(0, sensitiveLevels.length)],
        sameArticle: random(0, 10),
      })),
    })),
  }))
};

export default payload;
