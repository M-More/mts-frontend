import {
  generateRandomCNString,
  generateRandomID,
  generateRandomDate,
  random,
  sensitiveLevels,
  sourceTypes
} from '../constant';

const payload = {
  articles: new Array(100).fill(0).map(() => ({
    title: generateRandomCNString(10),
    source: sourceTypes[random(0, sourceTypes.length)],
    link: `https://www.invalid.${generateRandomID(10)}.com`,
    timestamp: generateRandomDate(24 * 10),
    content: generateRandomCNString(Math.floor(Math.random() * 200 + 100)),
    attribute: sensitiveLevels[random(0, sensitiveLevels.length)],
    sameArticle: random(0, 10),
  })),
};

export default payload;
