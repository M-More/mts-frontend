import Mock from 'mockjs';
import requests from '../utils/enums/requests';
import mockInfo from './mockInfo';

const agents = [
  Mock.mock(requests.search.url, mockInfo()),
];

export default agents;
