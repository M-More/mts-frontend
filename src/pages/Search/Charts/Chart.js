import React, { Component } from 'react';
import Lodash from 'lodash';
import moment from 'moment';
import requests from '../../../common/requests';
import criteria from '../../../common/enums/criteria';
import Doughnut from '../../../components/common/Chart/Doughnut/Doughnut';
import Filter from '../../../components/Search/Filter/Filter';
import Pie from "../../../components/common/Chart/Pie/Pie";

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
      cflagData: [],
      fromTypeData: [],
      timeTrendData: [],
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    this.getData(requests.getCflags, 'cflag');
    this.getData(requests.getFromTypes, 'fromType');
  };

  getData = (request, name) => {
    const current = Lodash.pick(this.state, ['keyword', 'startPublishedDay', 'endPublishedDay']);
    const params = Object.keys(current).map((rule) => {
      if (rule === 'keyword' && current[rule] === '') return (`${rule}=`);
      if (current[rule] === null) return (`${rule}=`);
      return (`${rule}=${current[rule]}`);
    }).join('&');
    const url = encodeURI(`${request.url}?${params}`);
    fetch(url, { method: request.method })
      .then((response) => response.json())
      .then((response) => {
        this.setState(() => {
          const newState = {};
          newState[`${name}Data`] = [];
          const options = Lodash.find(criteria, { name }).options || {};
          Object.keys(response).forEach((key) => {
            const value = key.slice(-1);
            const option = Lodash.find(options, { value }) || {};
            newState[`${name}Data`].push({
              name: option.label,
              label: option.label,
              value: response[key],
            });
          });
          return newState;
        });
      })
      .catch((error) => console.error(error));
  };

  handleDateChange = (moments) => {
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
    const { timeTrendData, cflagData, fromTypeData } = this.state;
    console.log(fromTypeData);
    return (
      <div className="mts-search-container">
        <Filter
          rules={criteria}
          current={current}
          onSelect={this.handleSelect}
          onSearch={this.handleKeywordChange}
          onDateChange={this.handleDateChange}
        />
        <Doughnut
          title="敏感度分部"
          data={cflagData}
        />
        <Pie
          title="类型分部"
          data={fromTypeData}
        />
      </div>
    );
  }
}

export default Chart;
