import React from 'react';
import Home from '../Home/Home';
import Overall from '../Overall/Overall';
import Programme from '../Programme/Programme';
import Admin from '../Admin/Admin';
import View from '../View/View';

const getRoutes = (userType) => {
  const routes = [
    { key: 'home', link: '/home', label: '首页', component: Home },
    { key: 'search', link: '/search', label: '全文搜索', component: Overall },
    { key: 'monitor', link: '/monitor', label: '方案管理', component: Programme },
    { key: 'view', link: '/view', label: '数据大屏', component: View },
  ];
  if (userType === 'admin') routes.push({ key: 'admin', link: '/admin', label: '用户管理', component: Admin });
  return routes;
};

export default getRoutes;
