import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import {
  QuestionCircleOutlined,
  BarChartOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import CreatedReport from './CreatedReport';
import TaskList from './TaskList';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class Analysis extends Component {
  constructor() {
    super();
    this.state = {
      menuSelectedKey: '1',
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
            <SubMenu icon={<BarChartOutlined />} title="舆情分析">
              <Menu.Item key="1" icon={<QuestionCircleOutlined />}>全网分析</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="content">
          <Menu theme="light" defaultSelectedKeys={['1']} mode="horizontal">
            <Menu.Item key="1" onClick={this.menuHandleClick}>任务列表</Menu.Item>
            <Menu.Item key="2" onClick={this.menuHandleClick}>已生成报告</Menu.Item>
            <Button
              type="primary"
              style={{ float: 'right', margin: '5px 20px' }}
              icon={<PlusOutlined />}
            >
              创建分析任务
            </Button>
          </Menu>
          <Content className="site-layout-background">
            {this.state.menuSelectedKey === '1' && (<TaskList />)}
            {this.state.menuSelectedKey === '2' && (<CreatedReport />)}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Analysis;
