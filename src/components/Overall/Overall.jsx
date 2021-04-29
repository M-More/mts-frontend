import React, { Component } from 'react';
import Lodash from 'lodash';
import moment from 'moment';
import {Form, Input, Layout, Button} from 'antd';
import MultiFilter from '../common/MultiFilter/MultiFilter';
import DataList from '../common/DataList/DataList';
import getOverallData from '../../services/request/data/getOverallData';
import getContentTag from "../../services/request/data/getContentTag";
import './Overall.scss';
import { LeftOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";

const PAGE_SIZE = 10;
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class Overall extends Component {
  constructor() {
    super();
    this.state = {
      curPath: '',
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
    // this.handleSearch();
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
    const result = await getOverallData(...params);
    const contents = result.data.map((item) => item.content);
    this.setState({
      data: result.data,
      dataSize: result.dataSize,
    });
    const { pageId } = this.state;
    const tagResult = await getContentTag(contents, pageId);
    this.setState(prevState => {
      if (prevState.pageId !== pageId) {
        console.log('请求超时：用户翻页');
        return {};
      }
      const newData = [...prevState.data];
      const tags = tagResult.result;
      newData.forEach((item, index) => {
        const tag = tags[index.toString()];
        console.log(item, '分类为', tag);
        item.tag = tag || '无';
      });
      return {
        data: newData,
        curPath: '/result',
      };
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

  handleBack = () => {
    this.setState({
      curPath: '',
      keyword: '',
    });
  };

  render() {
    const params = ['sensi', 'source', 'timeOrder', 'dateRange', 'startPublishedDay', 'endPublishedDay'];
    const current = Lodash.pick(this.state, params);
    const { data, dataSize, pageSize, curPath, keyword } = this.state;
    switch (curPath) {
      case '/result':
        return (
          <Layout className="mts-overall-container">
            <div className="back" onClick={() => this.handleBack('')}>
              <LeftOutlined className="back-icon" />
              返回
            </div>
            <MultiFilter
              initialKeyword={keyword}
              current={current}
              onSelect={this.handleSelect}
              onSearch={this.handleKeywordChange}
              onDateChange={this.handleDateChange}
            />
            <DataList
              data={data}
              dataSize={dataSize}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
            />
          </Layout>
        );
      case '':
        return (
          <div className="search-entry-wrap">
            <div className="title">全网搜索 <SearchOutlined /></div>
            <Input
              className="search-entry-input"
              size="large"
              value={keyword}
              onChange={e => this.setState({ keyword: e.target.value })}
            />
            <div className="btn-group">
              <Button type="primary" onClick={this.handleSearch}>百度搜素</Button>
              <Button type="primary">搜狗搜素</Button>
            </div>
          </div>
        );
    }

  }
}

export default Overall;
