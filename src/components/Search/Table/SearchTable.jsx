import React, { Component } from 'react';
import Lodash from 'lodash';
import moment from 'moment';
import requests from '../../../common/enums/requests';
import criteria from '../../../common/enums/criteria';
import Filter from '../../common/Filter/Filter';
import Results from '../../common/InfoList/InfoList';

const PAGE_SIZE = 10;
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class SearchTable extends Component {
  constructor() {
    super();
    this.state = {
      // request param
      page: 0,
      pageSize: PAGE_SIZE,
      keyword: '',
      fromType: null,
      startPublishedDay: null,
      endPublishedDay: null,
      cflag: null,
      dateRange: null,
      timeOrder: 0,
      // response param
      hitNumber: 0,
      results: [],
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const { getInfo } = requests;
    const current = Lodash.pick(this.state, ['keyword', 'fromType', 'startPublishedDay', 'endPublishedDay', 'cflag', 'timeOrder', 'pageSize', 'page']);
    const params = Object.keys(current).map((rule) => {
      if (rule === 'keyword' && current[rule] === '') return (`${rule}=`);
      if (current[rule] === null) return (`${rule}=`);
      return (`${rule}=${current[rule]}`);
    }).join('&');
    const url = encodeURI(`${getInfo.url}?${params}`);
    console.log(url);
    fetch(url, { method: getInfo.method })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          results: response.dataContent,
          hitNumber: response.hitNumber,
        });
      })
      .catch((error) => console.error(error));
  };

  handleDateChange = (moments) => {
    console.log('dateChange');
    const [startMoment, endMoment] = moments;
    this.setState({
      startPublishedDay: startMoment.format(DATE_FORMAT),
      endPublishedDay: endMoment.format(DATE_FORMAT),
    });
  };

  handleSelect = (name, value) => {
    const newState = {};
    newState[name] = value;
    this.setState(newState);
    const current = '2020-07-18 12:00:00';
    if (name === 'dateRange') {
      switch (value) {
        case 0:
          this.setState({
            endPublishedDay: moment(current).format(DATE_FORMAT),
            startPublishedDay: moment(current).startOf('day').format(DATE_FORMAT),
          });
          break;
        case null:
          this.setState({
            startPublishedDay: null,
            endPublishedDay: null,
          });
          break;
        default:
          this.setState({
            endPublishedDay: moment(current).format(DATE_FORMAT),
            startPublishedDay: moment(current).subtract(value, 'days').format(DATE_FORMAT),
          });
          break;
      }
    }
  };

  handlePageChange = (page) => {
    console.log('pageChange');
    this.setState({ page }, () => {
      this.handleSearch();
    });
  };

  handleKeywordChange = (keyword) => {
    this.setState({ keyword }, () => {
      this.handleSearch();
    });
  };

  render() {
    const current = Lodash.pick(this.state, ['cflag', 'fromType', 'timeOrder', 'dateRange']);
    const { results, hitNumber, pageSize } = this.state;
    return (
      <div className="mts-search-container">
        <Filter
          rules={criteria}
          current={current}
          onSelect={this.handleSelect}
          onSearch={this.handleKeywordChange}
          onDateChange={this.handleDateChange}
        />
        <Results
          results={results}
          hitNumber={hitNumber}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default SearchTable;
