import React from 'react';
import Home from '../../pages/Home/Home';
import Search from '../../pages/Search/Search';

const routes = [
  { key: 'home', link: '/home', label: '首页', component: Home },
  { key: 'search', link: '/search', label: '全文搜索', component: Search },
  { key: 'monitor', link: '/monitor', label: '舆情监测' },
  { key: 'material', link: '/material', label: '资料管理' },
  { key: 'admin', link: '/admin', label: '用户管理' },
];

export default routes;
