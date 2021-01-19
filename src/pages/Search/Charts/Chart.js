import React, { Component } from 'react';
import Lodash from 'lodash';
import moment from 'moment';
import requests from '../../../common/requests';
import rules from '../../../common/enums/rules';
import Doughnut from '../../../components/common/Chart/Doughnut/Doughnut';
import Filter from '../../../components/Search/Filter/Filter';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      // request param
      keyword: '',
      startPublishedDay: null,
      endPublishedDay: null,
      dateRange: null,
      // response param
      cflagResults: {},
      fromTypeResults: {},
      timeTrendResults: {},
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const { getCflagResults } = requests;
    const current = Lodash.pick(this.state, ['keyword', 'startPublishedDay', 'endPublishedDay']);
    const params = Object.keys(current).map((rule) => {
      if (rule === 'keyword' && current[rule] === '') return (`${rule}=`);
      if (current[rule] === null) return (`${rule}=`);
      return (`${rule}=${current[rule]}`);
    }).join('&');
    const url = encodeURI(`${getCflagResults.url}?${params}`);
    fetch(url, { method: getCflagResults.method })
      .then((response) => response.json())
      .then((response) => {
        console.log(url, response);
        this.setState({
          cflagResults: {
            '敏感': response.cflag1,
            '非敏感': response.cflag2,
          },
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

  handleKeywordChange = (keyword) => {
    this.setState({ keyword }, () => {
      this.handleSearch();
    });
  };

  render() {
    const current = Lodash.pick(this.state, ['dateRange']);
    const { timeTrendResults, cflagResults, fromTypeResults } = this.state;
    return (
      <div className="mts-search-container">
        <Filter
          rules={rules}
          current={current}
          onSelect={this.handleSelect}
          onSearch={this.handleKeywordChange}
          onDateChange={this.handleDateChange}
        />
        <Doughnut
          title="敏感"
          results={cflagResults}
        />
      </div>
    );
  }
}

export default Chart;
