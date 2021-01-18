import Mock from 'mockjs';
import mockFetch from 'mockjs-fetch';
import requests from '../common/requests';
import mockInfo from './mockInfo';

mockFetch(Mock);
Mock.mock(requests.search.url, requests.search.method, mockInfo());

