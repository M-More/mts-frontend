import React, { Component } from 'react';
import { Button, Input, Table, Checkbox } from 'antd';
import moment from 'moment';
import {
  HeartOutlined,
  TagsOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions';
import SearchCondition from '../SearchCondition/SearchCondition';
import './InfoList.scss';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
  },
  getCheckboxProps: record => ({
    name: record.title
  }),
};
const columnRender = [
  {
    width: 600,
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '相同文章',
    dataIndex: 'sameArticle',
    key: 'sameArticle',
  },
  {
    title: '来源',
    dataIndex: 'source',
    key: 'source',
    render: (text) => (text.value)
  },
  {
    title: '时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (text) => (text.format('lll')),
  },
];
class InfoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useFilter: false,
    };
  }

  exportResult = () => {

  }

  handleClick = (type, value) => {
    switch (type) {
      case 'query':
        this.setState({ useFilter: !value });
        break;
      default:
        break;
    }
  }

  handleMaterial = (e) => {

  }

  handleCollect = (e) => {

  }

  filterData = (data) => {
    const { currentTimeRange, currentTimeOrder, currentSensitive, currentSource } = this.props;
    let newData = data;
    // filter by timestamp
    let latestTimestamp; let
      oldestTimestamp;
    switch (currentTimeRange) {
      case '今日':
        latestTimestamp = moment();
        oldestTimestamp = moment().add(-1, 'day');
        break;
      case '一日':
        latestTimestamp = moment();
        oldestTimestamp = moment().add(-1, 'day');
        break;
      case '两日':
        latestTimestamp = moment();
        oldestTimestamp = moment().add(-2, 'day');
        break;
      case '三日':
        latestTimestamp = moment();
        oldestTimestamp = moment().add(-3, 'day');
        break;
      case '七日':
        latestTimestamp = moment();
        oldestTimestamp = moment().add(-7, 'day');
        break;
      case '十日':
        latestTimestamp = moment();
        oldestTimestamp = moment().add(-10, 'day');
        break;
      case '自定义':
        latestTimestamp = moment();
        oldestTimestamp = moment().add(-10, 'day');
        break;
      default:
        break;
    }
    if (latestTimestamp && oldestTimestamp) newData = newData.filter((item) => (item.timestamp > oldestTimestamp && item.timestamp < latestTimestamp));
    switch (currentTimeOrder) {
      case '时间升序':
        newData.sort((a, b) => a.timestamp - b.timestamp);
        break;
      case '时间降序':
        newData.sort((a, b) => -a.timestamp + b.timestamp);
        break;
      default:
        break;
    }
    newData = newData.filter((item) => item.source.value === currentSource);
    newData = newData.filter((item) => item.attribute.value === currentSensitive);
    return newData;
  }

  render() {
    const { useFilter } = this.state;
    const data = useFilter ? this.filterData(this.props.data) : this.props.data;
    return (
      <div>
        <div>
          <SearchCondition
            onChange={this.handleChange}
            ref={(r) => this.condition = r}
          />
        </div>
        <div>
          <div id="searchButton">
            <Button
              type="primary"
              size="medium"
              block
              onClick={() => this.handleClick('query', useFilter)}
            >
              { useFilter ? '取消' : '查询' }
            </Button>
          </div>
          <div id="searchButton">
            <Button
              type="primary"
              size="medium"
              block
              onClick={this.exportResult}
            >
              导出Excel
            </Button>
          </div>
          <div id="table">
            <Table
              rowKey={record => record.title}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              pagination={{ position: ['none', 'bottomRight'] }}
              footer={() => (
                <div className="info-list-footer">
                  <Checkbox
                    onChange={this.onChange}
                    className="info-list-checkbox"
                  >
                    批量操作：
                  </Checkbox>
                  <div id="iconButton">
                    <Button primary icon={<TagsOutlined />} onClick={e => this.handleMaterial(e)}/>
                  </div>
                  <div id="iconButton">
                    <Button primary icon={<HeartOutlined />} onClick={e => this.handleCollect(e)}/>
                  </div>
                  <div id="input">
                    <Input placeholder="在结果中搜索，支持单个单词" />
                  </div>
                  <div id="searchButton">
                    <Button type="primary" icon={<SearchOutlined />}>
                      搜索
                    </Button>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentTimeRange: state.currentTimeRange,
  currentTimeOrder: state.currentTimeOrder,
  currentSensitive: state.currentSensitive,
  currentSource: state.currentSource,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(InfoList);
