import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  FolderOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import UserList from './UserList'
import RoleList from './RoleList'
import OrganizationList from './OrganizationList'
import './Manager.css';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class Manager extends Component {
  constructor() {
    super();
    this.state = {
      menuSelectedKey: '1'
    };
  }

  menuHandleClick = (e) => {
    this.setState({ menuSelectedKey: e.key })
  }

  render() {
    return (
      <Layout style={ { minHeight: '100vh' } }>
        <Sider className="sider">
          <div className="logo" />
          <Menu theme="light" defaultSelectedKeys={ [ '1' ] } mode="inline">
            <SubMenu key="sub1" icon={ <FolderOutlined /> } title="用户管理">
              <Menu.Item key="1" icon={ <UnorderedListOutlined /> } onClick={ this.menuHandleClick }>用户列表</Menu.Item>
            </SubMenu>
            <SubMenu key="sub1" icon={ <FolderOutlined /> } title="角色管理">
              <Menu.Item key="2" icon={ <UnorderedListOutlined /> } onClick={ this.menuHandleClick }>角色列表</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={ <FolderOutlined /> } title="机构管理">
              <Menu.Item key="3" icon={ <UnorderedListOutlined /> } onClick={ this.menuHandleClick }>机构列表</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="content">
          <Breadcrumb className="breadcrumb" separator=">">
            <Breadcrumb.Item>系统设置</Breadcrumb.Item>
            <Breadcrumb.Item>
              {this.state.menuSelectedKey === '1' && (<span>用户管理</span>)}
              {this.state.menuSelectedKey === '2' && (<span>角色管理</span>)}
              {this.state.menuSelectedKey === '3' && (<span>机构管理</span>)}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {this.state.menuSelectedKey === '1' && (<span>用户列表</span>)}
              {this.state.menuSelectedKey === '2' && (<span>角色列表</span>)}
              {this.state.menuSelectedKey === '3' && (<span>机构列表</span>)}
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content className="site-layout-background">
            {this.state.menuSelectedKey === '1' && (<UserList />)}
            {this.state.menuSelectedKey === '2' && (<RoleList />)}
            {this.state.menuSelectedKey === '3' && (<OrganizationList />)}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Manager;