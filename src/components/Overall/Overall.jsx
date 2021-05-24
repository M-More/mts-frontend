import React, { Component } from 'react';
import Lodash from 'lodash';
import moment from 'moment';
import { Form, Input, Layout, Button } from 'antd';
import { SearchOutlined, LeftOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MultiFilter from '../common/MultiFilter/MultiFilter';
import DataList from '../common/DataList/DataList';
import getOverallData from '../../services/request/data/getOverallData';
import getContentTag from '../../services/request/data/getContentTag';
import getContentEmotion from "../../services/request/data/getContentEmotion";
import AutofitWrap from '../common/AutofitWrap/AutofitWrap';
import './Overall.scss';

import { actions } from '../../redux/actions';

const PAGE_SIZE = 10;
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class Overall extends Component {
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
      loading: false,
    };
    this.data = {};
  }

  componentDidMount() {
    // this.handleSearch();
  }

  handleSearch = async () => {
    this.setState({ loading: true })
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
    this.props.onOverallPathChange({ path: '/result' });
    const result = await getOverallData(...params);
    const { pageId } = this.state;
    this.setState((prevState) => {
      if (prevState.pageId !== pageId) {
        console.log('请求超时：用户翻页');
        return { loading: false };
      }
      return {
        loading: false,
        data: result.data,
        dataSize: result.dataSize,
      };
    });
    this.getContentTag();
    this.getContentEmotion();
  };

  getContentEmotion = async () => {
    const contents = this.state.data.map((item) => item.content);
    const { pageId } = this.state;
    const tagResult = await getContentEmotion(contents, pageId);
    this.setState(prevState => {
      if (prevState.pageId !== pageId) {
        console.log('请求超时：用户翻页');
        return {};
      }
      const newData = [...prevState.data];
      const tags = tagResult.result;
      newData.forEach((item, index) => {
        const tag = tags[index.toString()];
        item.emotion = tag || '';
      });
      return {
        data: newData,
      };
    });
  };

  getContentTag = async () => {
    const contents = this.state.data.map((item) => item.content);
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
        item.tag = tag || '';
      });
      return {
        data: newData,
      };
    });
  };

  handleDateChange = (moments) => {
    if (!moments) {
      this.setState({
        startPublishedDay: '',
        endPublishedDay: '',
      });
      return
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
    const current = moment();
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

  handlePageSizeChange = (current, pageSize) => {
    this.setState({ pageSize, pageId: 0 }, () => {
      this.handleSearch();
    });
  };

  handleKeywordChange = (keyword) => {
    this.setState({ keyword }, () => {
      this.handleSearch();
    });
  };

  /* handleBack = () => {
    this.setState({
      curPath: '',
      keyword: '',
    });
  }; */

  render() {
    const params = ['sensi', 'source', 'timeOrder', 'dateRange', 'startPublishedDay', 'endPublishedDay'];
    const current = Lodash.pick(this.state, params);
    const { data, dataSize, pageSize, keyword, loading } = this.state;
    const curPath = this.props.overallPath;

    switch (curPath) {
      case '/result':
        return (
          <div className="overall-wrap">
            <div className="mts-overall-container">
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
                loading={loading}
                onPageChange={this.handlePageChange}
                onPageSizeChange={this.handlePageSizeChange}
              />
            </div>
          </div>
        );
      case '':
        return (
          <AutofitWrap
            minHeight={600}
            padding={150}
            className="main-wrap"
          >
            <div className="search-entry-wrap">
              <div className="title">全网搜索 <SearchOutlined /></div>
              <Input.Search
                className="search-entry-input"
                enterButton="搜素"
                onChange={e => this.setState({ keyword: e.target.value })}
                value={keyword}
                size="large"
                onSearch={this.handleSearch}
              />
              {/* <div className="btn-group">
                <Button type="primary" onClick={this.handleSearch}>百度搜素</Button>
                <Button type="primary">搜狗搜素</Button>
              </div> */}
            </div>
          </AutofitWrap>
        );
    }
  }
}

const mapStateToProps = (state) => ({
  overallPath: state.overallPath,
});
const mapDispatchToProps = {
  onOverallPathChange: actions.onOverallPathChange,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Overall));
