import React, { Component } from 'react';
import Table from "./Table/Table";
import './Search.scss';

class Search extends Component {
  render() {
    return (
      <div className="mts-search-container">
        <Table />
      </div>
    );
  }
}

export default Search;
