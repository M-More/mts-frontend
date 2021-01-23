import Mock from 'mockjs';
import mockFetch from 'mockjs-fetch';
import requests from '../common/requests';
import information from './information';
import cflags from './cflags';
import fromTypes from "./fromTypes";
import trend from "./trend";

mockFetch(Mock);
Mock.mock(requests.getCflags.url, requests.getCflags.method, cflags());
Mock.mock(requests.getFromTypes.url, requests.getFromTypes.method, fromTypes());
Mock.mock(requests.getTrend.url, requests.getTrend.method, trend());
Mock.mock(requests.getInformation.url, requests.getInformation.method, information());
