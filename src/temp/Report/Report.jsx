import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  FolderOutlined,
  StarOutlined,
  UnorderedListOutlined,
  TagsOutlined,
  SettingOutlined
} from '@ant-design/icons';
import ReportList from './ReportList';
import MaterialManage from './MaterialManage';
import TemplateManage from './TemplateManage';
import DefaultFavorites from './DefaultFavorites';
import './Report.css';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class Report extends Component {
  constructor() {
    super();
    this.state = {
      menuSelectedKey: '1'
    };
  }

  menuHandleClick = (e) => {
    this.setState({ menuSelectedKey: e.key });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider className="sider">
          <div className="logo" />
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu key="sub1" icon={<FolderOutlined />} title="我的简报库">
              <Menu.Item key="1" icon={<UnorderedListOutlined />} onClick={this.menuHandleClick}>简报列表</Menu.Item>
              <Menu.Item key="2" icon={<TagsOutlined />} onClick={this.menuHandleClick}>素材管理</Menu.Item>
              <Menu.Item key="3" icon={<SettingOutlined />} onClick={this.menuHandleClick}>模板管理</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<StarOutlined />} title="收藏夹">
              <Menu.Item key="4" icon={<FolderOutlined />} onClick={this.menuHandleClick}>默认收藏夹</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="content">
          <Breadcrumb className="breadcrumb" separator=">">
            <Breadcrumb.Item>舆情简报</Breadcrumb.Item>
            <Breadcrumb.Item>
              {this.state.menuSelectedKey === '1' && (<span>我的简报库</span>)}
              {this.state.menuSelectedKey === '2' && (<span>我的简报库</span>)}
              {this.state.menuSelectedKey === '3' && (<span>我的简报库</span>)}
              {this.state.menuSelectedKey === '4' && (<span>收藏夹</span>)}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {this.state.menuSelectedKey === '1' && (<span>简报列表</span>)}
              {this.state.menuSelectedKey === '2' && (<span>素材管理</span>)}
              {this.state.menuSelectedKey === '3' && (<span>模板管理</span>)}
              {this.state.menuSelectedKey === '4' && (<span>默认收藏夹</span>)}
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content className="site-layout-background">
            {this.state.menuSelectedKey === '1' && (<ReportList />)}
            {this.state.menuSelectedKey === '2' && (<MaterialManage />)}
            {this.state.menuSelectedKey === '3' && (<TemplateManage />)}
            {this.state.menuSelectedKey === '4' && (<DefaultFavorites />)}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Report;
