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
      pageId: 0,
      pageSize: PAGE_SIZE,
      keyword: '',
      source: null,
      startPublishedDay: null,
      endPublishedDay: null,
      sensi: null,
      dateRange: null,
      timeOrder: 0,
      dataSize: 0,
      data: [],
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = async () => {
    const params = [
      this.state.keyword,
      this.state.source,
      this.state.startPublishedDay,
      this.state.endPublishedDay,
      this.state.sensi,
      this.state.timeOrder,
      this.state.pageSize,
      this.state.pageId,
    ];
    const result = await getInfo(...params);
    console.log(result);
    this.setState({
      data: result.data,
      dataSize: result.dataSize,
    });
  };

  handleDateChange = (moments) => {
    if (!moments) {
      this.setState({
        startPublishedDay: null,
        endPublishedDay: null,
      });
    }
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
          this.handleDateChange([
            moment(current),
            moment(current).startOf('day'),
          ]);
          break;
        case -1:
        case null:
          this.handleDateChange();
          break;
        default:
          this.handleDateChange([
            moment(current),
            moment(current).subtract(value, 'days'),
          ]);
          break;
      }
    }
  };

  handlePageChange = (pageId) => {
    this.setState({ pageId }, () => {
      this.handleSearch();
    });
  };

  handleKeywordChange = (keyword) => {
    this.setState({ keyword }, () => {
      this.handleSearch();
    });
  };

  render() {
    const params = ['sensi', 'source', 'timeOrder', 'dateRange', 'startPublishedDay', 'endPublishedDay'];
    const current = Lodash.pick(this.state, params);
    const { data, dataSize, pageSize } = this.state;
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
          dataSize={dataSize}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default SearchTable;
