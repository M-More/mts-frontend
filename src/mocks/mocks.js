import Mock from 'mockjs';
import mockFetch from 'mockjs-fetch';
import requests from '../common/requests';
import genInfoResults from './genInfoResults';
import genCflagResults from "./genCflagResults";

mockFetch(Mock);
Mock.mock(requests.getCflagResults.url, requests.getCflagResults.method, genCflagResults());
Mock.mock(requests.getInfoResults.url, requests.getInfoResults.method, genInfoResults());
