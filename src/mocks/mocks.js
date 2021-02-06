import Mock from 'mockjs';
import mockFetch from 'mockjs-fetch';
import requests from '../common/enums/requests';
import mockInfo from './mockInfo';
import mockCflags from './mockCflags';
import mockResources from "./mockResources";
import mockTrend from "./mockTrend";

mockFetch(Mock);
Mock.mock(requests.getCflags.url, requests.getCflags.method, mockCflags());
Mock.mock(requests.getResources.url, requests.getResources.method, mockResources());
Mock.mock(requests.getTrend.url, requests.getTrend.method, mockTrend());
Mock.mock(requests.getInfo.url, requests.getInfo.method, mockInfo());
