import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import SearchTable from './SearchTable/SearchTable';
import './Search.scss';

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
        <SearchTable />
      </Layout>
    );
  }
}

export default Search;
