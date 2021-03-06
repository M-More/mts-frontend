import Mock from 'mockjs';
import mockFetch from 'mockjs-fetch';
import requests from '../requests';
import getInfo from './data/getInfo';
import getSensiLayout from './data/getSensiLayout';
import getSourceLayout from './data/getSourceLayout';
import getAmountTrend from './data/getAmountTrend';
import getTopics from './data/getTopics';
import getRegionLayout from './data/getRegionLayout';

mockFetch(Mock);
Mock.mock(requests.getSensiLayout.url, requests.getSensiLayout.method, getSensiLayout());
Mock.mock(requests.getSourceLayout.url, requests.getSourceLayout.method, getSourceLayout());
Mock.mock(requests.getAmountTrend.url, requests.getAmountTrend.method, getAmountTrend());
Mock.mock(requests.getInfo.url, requests.getInfo.method, getInfo());
Mock.mock(requests.getTopics.url, requests.getTopics.method, getTopics());
Mock.mock(requests.getRegionLayout.url, requests.getRegionLayout.method, getRegionLayout());
