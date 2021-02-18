import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import SearchTable from '../../components/Search/Table/SearchTable';
import './Search.scss';
import SearchChart from "../../components/Search/Charts/SearchChart";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      page: 'table',
    };
  }

  handlePageChange = (event) => {
    this.setState({ page: event.key });
  };

  render() {
    const { page } = this.state;
    return (
      <Layout className="mts-search-container">
        <Menu
          theme="light"
          selectedKeys={[page]}
          mode="horizontal"
          className="mts-search-menu"
          onClick={this.handlePageChange}
        >
          <Menu.Item key="table">信息列表</Menu.Item>
          <Menu.Item key="charts">数据大屏</Menu.Item>
        </Menu>
        <Layout.Content className="site-layout-background">
          {page === 'table' && (<SearchTable />)}
          {page === 'charts' && (<SearchChart />)}
        </Layout.Content>
      </Layout>
    );
  }
}

export default Search;
