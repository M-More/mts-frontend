import React, { Component } from 'react';
import { Input, Button, Table } from 'antd';
import './GlobalSearch.css';
import SearchCondition from '../common/SearchCondition/SearchCondition';
import payload from './payload';
import InfoList from "../common/InfoList/InfoList";

class GlobalSearch extends Component {
  constructor() {
    super();
    this.state = {
      searchKeyword: '',
      data: [],
    };
    this.textInput = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ data: payload.articles })
    }, 0);
  }

  handleKeywordChange = (event) => {
    this.setState({
      searchKeyword: event.target.value,
    });
  }

  clearInput = () => {
    this.textInput.current.state.value = '';
    this.setState({});
  }

  render() {
    const { data, searchKeyword } = this.state;
    return (
      <div className="global-search-container">
        <InfoList data={data} />
      </div>
    );
  }
}

export default GlobalSearch;
