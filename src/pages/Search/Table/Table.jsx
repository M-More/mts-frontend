import React, { Component } from 'react';
import Lodash from 'lodash';
import moment from 'moment';
import requests from '../../../common/requests';
import criteria from '../../../components/Search/Filter/criteria';
import Filter from '../../../components/Search/Filter/Filter';
import Results from '../../../components/Search/Results/Results';

const PAGE_SIZE = 10;
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class Table extends Component {
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
      data: [],
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const { search } = requests;
    const current = Lodash.pick(this.state, ['keyword', 'fromType', 'startPublishedDay', 'endPublishedDay', 'cflag', 'timeOrder', 'pageSize', 'page']);
    const params = Object.keys(current).map((criterion) => {
      if (criterion === 'keyword' && current[criterion] === '') return (`${criterion}=`);
      if (current[criterion] === null) return (`${criterion}=`);
      return (`${criterion}=${current[criterion]}`);
    }).join('&');
    const url = encodeURI(`${search.url}?${params}`);
    console.log(url);
    fetch(url, { method: search.method })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          data: response.dataContent,
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
    const { data, hitNumber, pageSize } = this.state;
    return (
      <div className="mts-search-container">
        <Filter
          criteria={criteria}
          current={current}
          onSelect={this.handleSelect}
          onSearch={this.handleKeywordChange}
          onDateChange={this.handleDateChange}
        />
        <Results
          data={data}
          hitNumber={hitNumber}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Table;
