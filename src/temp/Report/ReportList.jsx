import React, { Component } from 'react';
import { Table, Space, Input, DatePicker, Button } from 'antd';
import {
  FileWordOutlined,
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons';
import './ReportList.css';

const { RangePicker } = DatePicker;

const columns = [
  {
    title: '简报名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '生成时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a><FileWordOutlined style={{ fontSize: '18px' }}/></a>
        <a>删除</a>
        <a>提取素材</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: '新冠肺炎',
    time: '2020-07-30 10:37',
  },
  {
    key: '2',
    name: '银行',
    time: '2019-11-26 15:57',
  },
  {
    key: '3',
    name: '化妆品',
    time: '2019-08-14 22:19',
  },
  {
    key: '4',
    name: '千户苗寨',
    time: '2019-08-12 16:57',
  },
  {
    key: '5',
    name: '高利贷',
    time: '2019-06-06 20:24',
  },
  {
    key: '6',
    name: '老干妈',
    time: '2019-05-20 16:38',
  },
  {
    key: '7',
    name: '俄罗斯',
    time: '2018-10-23 23:45',
  },
  {
    key: '8',
    name: '恐怖袭击',
    time: '2018-10-23 13:45',
  },
  {
    key: '9',
    name: '上海城建',
    time: '2018-09-28 21:54',
  },
];

class ReportList extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div>
          <div id="input">
            <Input placeholder="输入简报标题" />
          </div>
          <div id="rangePicker">
            <RangePicker showTime />
          </div>
          <div id="searchButton">
            <Button type="primary" icon={<SearchOutlined />}>
              查询
            </Button>
          </div>
          <div id="newButton">
            <Button type="primary" icon={<PlusOutlined />}>
              新建
            </Button>
          </div>
        </div>
        <div id="table">
          <Table columns={ columns } dataSource={ data } />
        </div>
      </div>
    );
  }
}

export default ReportList;
