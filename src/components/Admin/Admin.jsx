import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { FolderOutlined, UnorderedListOutlined } from '@ant-design/icons';
import OrgList from './UserList/OrgList';
import UserList from './UserList/UserList';
import './Admin.scss';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      curRole: 'user',
      users: [],
      orgs: [],
    };
  }

  componentDidMount() {
    this.getUsers();
    this.getOrgs();
  }

  getUsers = () => {

  };

  getOrgs = () => {};

  handleRoleSelect = (e) => {
    this.setState({ curRole: e.key });
  };

  render() {
    const { curRole, users, orgs } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          className="admin-sider-wrap"
          theme="light"
        >
          <div className="logo" />
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[curRole]}
            onClick={this.handleRoleSelect}
          >
            <Menu.Item key="user" icon={<UnorderedListOutlined />}>用户列表</Menu.Item>
            <Menu.Item key="org" icon={<UnorderedListOutlined />}>机构列表</Menu.Item>
          </Menu>
        </Sider>
        <Content className="site-layout-background">
          { curRole === 'user' ? <UserList users={users} /> : null }
          { curRole === 'org' ? <OrgList orgs={orgs} /> : null }
        </Content>
      </Layout>
    );
  }
}

export default Admin;