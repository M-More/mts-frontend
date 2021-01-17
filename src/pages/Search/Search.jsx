import React, { Component } from 'react';
import requests from "../../utils/enums/requests";
import mocks from "../../mocks/mocks";

class GlobalSearch extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
  }

  render() {
    const { data, searchKeyword } = this.state;
    return (
      <div className="mts-search-container">
      </div>
    );
  }
}

export default GlobalSearch;
