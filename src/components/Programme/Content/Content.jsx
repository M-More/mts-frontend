import React from 'react';
import { Layout, Menu } from 'antd';
import Specific from '../Specific/Specific';
import Config from '../Config/Config';
import View from '../View/View';

class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      curTabPage: 'info',
    };
  }

  handleTabPageSelect = (e) => {
    this.setState({
      curTabPage: e.key,
    });
  };

  render() {
    const { curTabPage } = this.state;
    const { curProgramme } = this.props;
    return (
      <Layout.Content>
        <Menu
          theme="light"
          defaultSelectedKeys={curTabPage}
          mode="horizontal"
          onClick={this.handleTabPageSelect}
        >
          <Menu.Item key="info">信息列表</Menu.Item>
          <Menu.Item key="config">方案配置</Menu.Item>
          <Menu.Item key="view">数据大屏</Menu.Item>
        </Menu>
        <Layout.Content className="site-layout-background">
          {curTabPage === 'info' && <Specific curProgramme={curProgramme} />}
          {curTabPage === 'view' && <View curProgramme={curProgramme} />}
          {curTabPage === 'config' && <Config curProgramme={curProgramme} />}
        </Layout.Content>
      </Layout.Content>
    );
  }
}

export default Content;
