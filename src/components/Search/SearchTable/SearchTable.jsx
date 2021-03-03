import React, { Component } from 'react';
import Lodash from 'lodash';
import moment from 'moment';
import requests from '../../../services/requests';
import MultiFilter from '../../common/MultiFilter/MultiFilter';
import InfoList from '../../common/InfoList/InfoList';
import getInfo from '../../../services/data/getInfo';

const PAGE_SIZE = 10;
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class SearchTable extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      pageSize: PAGE_SIZE,
      keyword: '',
      fromType: null,
      startPublishedDay: null,
      endPublishedDay: null,
      cflag: null,
      dateRange: null,
      timeOrder: 0,
      hitNumber: 0,
      data: [],
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = async () => {
    const params = ['keyword', 'fromType', 'startPublishedDay', 'endPublishedDay', 'cflag', 'timeOrder', 'pageSize', 'page'];
    const current = Lodash.pick(this.state, params);
    const result = await getInfo(current);
    this.setState({
      data: result.data,
      hitNumber: result.hitNumber,
    });
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
    const params = ['cflag', 'fromType', 'timeOrder', 'dateRange', 'startPublishedDay', 'endPublishedDay'];
    const current = Lodash.pick(this.state, params);
    const { data, hitNumber, pageSize } = this.state;
    return (
      <div className="mts-search-container">
        <MultiFilter
          current={current}
          onSelect={this.handleSelect}
          onSearch={this.handleKeywordChange}
          onDateChange={this.handleDateChange}
        />
        <InfoList
          data={data}
          hitNumber={hitNumber}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default SearchTable;
