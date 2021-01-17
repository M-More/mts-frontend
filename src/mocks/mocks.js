import Mock from 'mockjs';
import mockFetch from 'mockjs-fetch';
import requestList from '../utils/enums/requestList';
import mockInfo from './mockInfo';

mockFetch(Mock);
Mock.mock(requestList.search.url, requestList.search.method, mockInfo());

